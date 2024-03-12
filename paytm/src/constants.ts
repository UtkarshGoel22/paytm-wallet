export const ErrorMessages = {
  INCORRECT_USERNAME_OR_PASSWORD: "Incorrect username or password",
  INVALID_REQUEST_DATA: "Invalid request data",
  SOMETHING_WENT_WRONG: "Something went wrong",
  UNAUTHORIZED_ACCESS: "You do not have access to perform the action",
};

export const FieldConstraints = {
  AMOUNT: { MIN_VALUE: 0 },
  NAME: { MAX_LENGTH: 50, MIN_LENGTH: 1 },
  PASSWORD: { MIN_LENGTH: 6 },
  USERNAME: { MAX_LENGTH: 30, MIN_LENGTH: 3 },
};

export const ResponseMessages = {
  USER_CREATED_SUCCESSFULLY: "User created successfully",
  USER_LOGGED_IN_SUCCESSFULLY: "User logged in successfully",
  USER_UPDATED_SUCCESSFULLY: "User updated successfully",
  USERS_FETCHED_SUCCESSFULLY: "Users fetched successfully",
  BALANCE_FETCHED_SUCCESSFULLY: "Balance fetched successfully",
  AMOUNT_TRANSFERED_SUCCESSFULLY: "Amount transferred successfully",
};

export const ValidationMessages = {
  AMOUNT_REQUIRED: "Amount required",
  AMOUNT_CANNOT_BE_NEGATIVE: "Amount can not be negative",
  FIRST_NAME_LENGTH: "First name should have 1-50 characters",
  FIRST_NAME_REQUIRED: "First name is required",
  INSUFFICEINT_BALANCE: "Insufficient balance",
  INVALID_ACCOUNT: "Invalid account",
  LAST_NAME_LENGTH: "Last name should have 1-50 characters",
  LAST_NAME_REQUIRED: "Last name is required",
  PASSWORD_MIN_LENGTH: "Password should have atleast 6 characters",
  PASSWORD_REQUIRED: "Password is required",
  TO_REQUIRED: "To required",
  USERNAME_ALREADY_EXISTS: "Email address already taken",
  USERNAME_INVALID: "Please enter a valid email address",
  USERNAME_LENGTH: "Username should have 4-30 characters",
  USERNAME_REQUIRED: "Username is required",
};
