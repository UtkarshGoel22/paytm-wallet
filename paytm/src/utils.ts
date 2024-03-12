import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { ErrorMessages } from "./constants";
import config from "./settings";
import { CustomResponse } from "./types";

export const argon2IdHasher = async (data: string | Buffer): Promise<string> => {
  return argon2.hash(data, {
    salt: Buffer.from(config.ARGON2ID_SALT, "utf-8"),
    type: argon2.argon2id,
  });
};

export const comparePassword = async (password: string, savedPassword: string): Promise<void> => {
  let errorData: object;
  let passwordMatch: boolean;

  try {
    passwordMatch = await argon2.verify(savedPassword, password, {
      secret: Buffer.from(config.ARGON2ID_SALT, "utf-8"),
    });
  } catch (error) {
    console.log("Error while verifying password", error);
    errorData = { somethingWentWrong: ErrorMessages.SOMETHING_WENT_WRONG };
    throw {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.SOMETHING_WENT_WRONG,
      data: errorData,
    };
  }

  if (!passwordMatch) {
    errorData = {
      email: ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
      password: ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
    };
    throw {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD,
      data: errorData,
    };
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return await argon2IdHasher(password);
  } catch (error) {
    console.log("Error while hashing password:", error);
    const errorData = { somethingWentWrong: ErrorMessages.SOMETHING_WENT_WRONG };
    throw { message: ErrorMessages.SOMETHING_WENT_WRONG, data: errorData };
  }
};

export const formatValidationErrors = (
  validationErrors: z.ZodIssue[]
): { [key: string]: string } => {
  const formattedValidationErrors = {};
  validationErrors.forEach((validationError) => {
    const key = validationError.path.join(".");
    formattedValidationErrors[key] = formattedValidationErrors[key]
      ? formattedValidationErrors[key] + ". " + validationError.message
      : validationError.message;
  });
  return formattedValidationErrors;
};

export const makeResponse = (
  success: boolean,
  message: string,
  data: object | undefined = undefined
): CustomResponse => {
  return { success, message, data };
};

export const validateData = (
  schema: z.ZodEffects<z.ZodObject<any>> | z.ZodObject<any>,
  data: object
): { [key: string]: string } => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorData = formatValidationErrors(result["error"].issues);
    throw { data: errorData };
  }
  return result.data;
};
