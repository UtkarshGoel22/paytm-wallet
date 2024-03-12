import { ErrorMessages } from "./constants";
import { SigninSchema, SignupSchema, UpdateUserSchema } from "./schemas";
import { validateData } from "./utils";

export const validateSigninRequestData = (data: object) => {
  try {
    return validateData(SigninSchema, data);
  } catch (error) {
    throw { message: ErrorMessages.INVALID_REQUEST_DATA, data: error.data };
  }
};

export const validateSignupRequestData = (data: object) => {
  try {
    return validateData(SignupSchema, data);
  } catch (error) {
    throw { message: ErrorMessages.INVALID_REQUEST_DATA, data: error.data };
  }
};

export const validateUpdateUserRequestData = (data: object) => {
  try {
    return validateData(UpdateUserSchema, data);
  } catch (error) {
    throw { message: ErrorMessages.INVALID_REQUEST_DATA, data: error.data };
  }
};
