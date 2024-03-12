import express from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";

import { ResponseMessages } from "../constants";
import { User } from "../db";
import { userSignupValidation } from "../middlewares";
import config from "../settings";
import { makeResponse } from "../utils";

const router = express.Router();

router.post("/signup", userSignupValidation, async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
  res
    .status(StatusCodes.CREATED)
    .json(makeResponse(true, ResponseMessages.USER_CREATED_SUCCESSFULLY, { token }));
});

export default router;
