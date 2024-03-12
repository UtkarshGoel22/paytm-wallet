import { z } from "zod";

import { ErrorMessages, FieldConstraints, ValidationMessages } from "./constants";

export const SigninSchema = z.object({
  username: z
    .string({ required_error: ValidationMessages.USERNAME_REQUIRED })
    .email(ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD)
    .min(FieldConstraints.USERNAME.MIN_LENGTH, ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD)
    .max(FieldConstraints.USERNAME.MAX_LENGTH, ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD),
  password: z
    .string({ required_error: ValidationMessages.PASSWORD_REQUIRED })
    .min(FieldConstraints.PASSWORD.MIN_LENGTH, ErrorMessages.INCORRECT_USERNAME_OR_PASSWORD),
});

export const SignupSchema = z.object({
  firstName: z
    .string({ required_error: ValidationMessages.FIRST_NAME_REQUIRED })
    .min(FieldConstraints.NAME.MIN_LENGTH, ValidationMessages.FIRST_NAME_LENGTH)
    .max(FieldConstraints.NAME.MAX_LENGTH, ValidationMessages.FIRST_NAME_LENGTH),
  lastName: z
    .string({ required_error: ValidationMessages.LAST_NAME_REQUIRED })
    .min(FieldConstraints.NAME.MIN_LENGTH, ValidationMessages.LAST_NAME_LENGTH)
    .max(FieldConstraints.NAME.MAX_LENGTH, ValidationMessages.LAST_NAME_LENGTH),
  username: z
    .string({ required_error: ValidationMessages.USERNAME_REQUIRED })
    .email(ValidationMessages.USERNAME_INVALID)
    .min(FieldConstraints.USERNAME.MIN_LENGTH, ValidationMessages.USERNAME_LENGTH)
    .max(FieldConstraints.USERNAME.MAX_LENGTH, ValidationMessages.USERNAME_LENGTH),
  password: z
    .string({ required_error: ValidationMessages.PASSWORD_REQUIRED })
    .min(FieldConstraints.PASSWORD.MIN_LENGTH, ValidationMessages.PASSWORD_MIN_LENGTH),
});
