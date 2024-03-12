import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";

import { ErrorMessages, ValidationMessages } from "./constants";
import { User } from "./db";
import {
  validateSigninRequestData,
  validateSignupRequestData,
  validateUpdateUserRequestData,
} from "./helpers";
import config from "./settings";
import { makeResponse } from "./utils";

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(makeResponse(false, ErrorMessages.UNAUTHORIZED_ACCESS));
  }
  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.userId = decoded["userId"];
    next();
  } catch (error) {
    const errData = { auth: ErrorMessages.UNAUTHORIZED_ACCESS };
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(makeResponse(false, ErrorMessages.UNAUTHORIZED_ACCESS, errData));
  }
}

export async function userSigninValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = validateSigninRequestData(req.body);
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(makeResponse(false, err.message, err.data));
  }

  next();
}

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

export async function userUpdateValidation(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = validateUpdateUserRequestData(req.body);
    next();
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json(makeResponse(false, err.message, err.data));
  }
}
