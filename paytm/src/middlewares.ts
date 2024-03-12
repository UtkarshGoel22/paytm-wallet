import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

import { ErrorMessages, ValidationMessages } from "./constants";
import { User } from "./db";
import { validateSignupRequestData } from "./helpers";
import { makeResponse } from "./utils";

export async function userSignupValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = validateSignupRequestData(req.body);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(makeResponse(false, err.message, err.data));
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    const errData = { username: ValidationMessages.USERNAME_ALREADY_EXISTS };
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(makeResponse(false, ErrorMessages.INVALID_REQUEST_DATA, errData));
  }

  next();
}
