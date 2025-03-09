import type { user } from "../types";
import { Schema, model } from "mongoose";

type UserDoc = user.UserDoc;
type UserModel = user.UserModal;
type UserVirtuals = user.UserVirtuals;

const UserSchema = new Schema<UserDoc, UserModel, UserVirtuals>(
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

UserSchema.path("username").validate(async function (
  value: string
): Promise<void> {
  if (await User.findOne({ username: value })) {
    this.invalidate("username", "Username already taken.");
  }
});

UserSchema.path("password").validate(function (value: string): void {
  if (this._confirmPassword !== value) {
    this.invalidate("confirmPassword", "Passwords must match.");
  }
});

const User = model("User", UserSchema);
export default User;
