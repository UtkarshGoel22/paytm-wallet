import { ErrorMessages } from "./constants";
import { SignupSchema } from "./schemas";
import { validateData } from "./utils";

export const validateSignupRequestData = (data: object) => {
  try {
    return validateData(SignupSchema, data);
  } catch (error) {
    throw { message: ErrorMessages.INVALID_REQUEST_DATA, data: error.data };
  }
};
