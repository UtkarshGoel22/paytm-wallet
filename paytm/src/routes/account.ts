import express, { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { ResponseMessages } from "../constants";
import { Account } from "../db";
import { tokenValidation } from "../middlewares";
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

export default router;
