import express, { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";

import { ErrorMessages, ResponseMessages } from "../constants";
import { User } from "../db";
import { userSigninValidation, userSignupValidation } from "../middlewares";
import config from "../settings";
import { makeResponse } from "../utils";

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

  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
  res
    .status(StatusCodes.CREATED)
    .json(makeResponse(true, ResponseMessages.USER_LOGGED_IN_SUCCESSFULLY, { token }));
});

router.post("/signup", userSignupValidation, async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
  res
    .status(StatusCodes.CREATED)
    .json(makeResponse(true, ResponseMessages.USER_CREATED_SUCCESSFULLY, { token }));
});

export default router;
