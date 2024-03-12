import express, { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

import { ErrorMessages, ResponseMessages, ValidationMessages } from "../constants";
import { Account } from "../db";
import { tokenValidation, transferAmountValidation } from "../middlewares";
import { makeResponse } from "../utils";

const router = express.Router();

router.get("/balance", tokenValidation, async (req: Request, res: Response) => {
  const account = await Account.findOne({ userId: req.userId });
  return res.status(StatusCodes.OK).json(
    makeResponse(true, ResponseMessages.BALANCE_FETCHED_SUCCESSFULLY, {
      balance: account.balance,
    })
  );
});

router.post(
  "/transfer",
  tokenValidation,
  transferAmountValidation,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (account.balance < amount) {
      await session.abortTransaction();
      const errData = { balance: ValidationMessages.INSUFFICEINT_BALANCE };
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(makeResponse(true, ErrorMessages.INVALID_REQUEST_DATA, errData));
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      const errData = { to: ValidationMessages.INVALID_ACCOUNT };
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(makeResponse(true, ErrorMessages.INVALID_REQUEST_DATA, errData));
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(
      session
    );
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    return res
      .status(StatusCodes.OK)
      .json(makeResponse(true, ResponseMessages.AMOUNT_TRANSFERED_SUCCESSFULLY));
  }
);

export default router;
