import * as dotenv from "dotenv";
import mongoose, { Document, Model } from "mongoose";

import { FieldConstraints } from "./constants";
import { hashPassword } from "./utils";

dotenv.config();

/* Connect to MongoDB database */
mongoose.connect(`${process.env.DB_URL}`);

const AccountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: FieldConstraints.NAME.MAX_LENGTH,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: FieldConstraints.NAME.MAX_LENGTH,
  },
  password: {
    type: String,
    required: true,
    minLength: FieldConstraints.PASSWORD.MIN_LENGTH,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: FieldConstraints.USERNAME.MIN_LENGTH,
    maxLength: FieldConstraints.USERNAME.MAX_LENGTH,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

export const Account = mongoose.model("Account", AccountSchema);
export const User = mongoose.model("User", UserSchema);
