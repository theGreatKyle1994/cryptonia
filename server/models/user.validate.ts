import type { user } from "../types";
import User from "../models/user.model";

type UserSchema = user.UserSchema;

function setValidations(UserSchema: UserSchema): void {
  UserSchema.path("username").validate(async function (
    value: string
  ): Promise<void> {
    if (await User.findOne({ username: value })) {
      this.invalidate(
        "username",
        "Username already taken.",
        value,
        "duplicate"
      );
    }
  });

  UserSchema.path("password").validate(function (value: string): void {
    if (this._confirmPassword !== value) {
      this.invalidate(
        "confirmPassword",
        "Passwords must match.",
        value,
        "validate"
      );
    }
  });
}

export default setValidations;
