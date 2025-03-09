import type { user } from "../types";
import User from "../models/user.model";

type UserSchema = user.UserSchema;

function setValidations(UserSchema: UserSchema): void {
  UserSchema.path("username").validate(async function (
    value: string
  ): Promise<void> {
    if (await User.findOne({ username: value }))
      this.invalidate("username", "Username already taken.");
  });

  UserSchema.path("password").validate(function (value: string): void {
    if (this._confirmPassword !== value)
      this.invalidate("confirmPassword", "Passwords must match.");
  });

  UserSchema.virtual("confirmPassword")
    .get(function (): string {
      return this._confirmPassword;
    })
    .set(function (value: string): void {
      this._confirmPassword = value;
    });
}

export default setValidations;
