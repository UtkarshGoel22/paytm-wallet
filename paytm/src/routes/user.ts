import express, { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";

import { ErrorMessages, ResponseMessages } from "../constants";
import { Account, User } from "../db";
import {
  tokenValidation,
  userSigninValidation,
  userSignupValidation,
  userUpdateValidation,
} from "../middlewares";
import config from "../settings";
import { comparePassword, makeResponse } from "../utils";

const router = express.Router();

router.post("/signin", userSigninValidation, async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    const errData = {
      password: ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
      username: ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
    };
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(makeResponse(false, ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD, errData));
  }

  try {
    await comparePassword(req.body.password, user.password);
  } catch (error) {
    return res.status(error.statusCode).json(makeResponse(false, error.message, error.data));
  }

  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);

  res
    .status(StatusCodes.CREATED)
    .json(makeResponse(true, ResponseMessages.USER_LOGGED_IN_SUCCESSFULLY, { token }));
});

router.post("/signup", userSignupValidation, async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
  await Account.create({ userId: user._id, balance: config.COMPLIMENTARY_BALANCE });
  res
    .status(StatusCodes.CREATED)
    .json(makeResponse(true, ResponseMessages.USER_CREATED_SUCCESSFULLY, { token }));
});

router.patch("/", tokenValidation, userUpdateValidation, async (req: Request, res: Response) => {
  const user = await User.findOneAndUpdate({ _id: req.userId }, req.body, { new: true }).select(
    "-password -__v"
  );
  return res
    .status(StatusCodes.OK)
    .json(makeResponse(true, ResponseMessages.USER_UPDATED_SUCCESSFULLY, { user }));
});

router.get("/bulk", async (req: Request, res: Response) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  }).select("-password -__v");

  return res
    .status(StatusCodes.OK)
    .json(makeResponse(true, ResponseMessages.USERS_FETCHED_SUCCESSFULLY, { users }));
});

export default router;
