import type { user } from "../types";
import { Schema, model } from "mongoose";
import { setStatics } from "./user.static";
import { setValidations } from "./user.validate";
import { setMiddleware } from "./user.middleware";

type UserSchema = user.UserSchema;

const UserSchema: UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: [3, "Username must be at least 3 characters."],
      maxLength: [15, "Username must be less than 15 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [3, "Password must be at least 3 characters."],
      maxLength: [15, "Password must be less than 15 characters"],
    },
    favorites: {
      type: [{ type: String }],
    },
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(function (): string {
    return this._confirmPassword;
  })
  .set(function (value: string): void {
    this._confirmPassword = value;
  });

setStatics(UserSchema);
setValidations(UserSchema);
setMiddleware(UserSchema);

const User = model<user.UserDoc, user.UserModel>("User", UserSchema);
export default User;
