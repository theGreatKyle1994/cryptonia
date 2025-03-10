import type { user } from "../types";
import type { Types } from "mongoose";
import User from "../models/user.model";
import bcrypt from "bcrypt";

type UserSchema = user.UserSchema;

export function setStatics(UserSchema: UserSchema) {
  UserSchema.static(
    "login",
    async function (
      username: string,
      password: string
    ): Promise<NativeError | Types.ObjectId> {
      const account = await this.findOne({ username });
      if (account) {
        if (await bcrypt.compare(password, account.password)) {
          return account._id;
        } else {
          return <NativeError>(
            new User().invalidate(
              "password",
              "Incorrect password.",
              password,
              "invalid"
            )
          );
        }
      } else {
        return <NativeError>(
          new User().invalidate(
            "username",
            "Username not found.",
            username,
            "invalid"
          )
        );
      }
    }
  );
}
