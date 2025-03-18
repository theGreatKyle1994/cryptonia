import type { user } from "../types";
import { Types } from "mongoose";
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

  UserSchema.static(
    "updateProfile",
    async function (
      type: string,
      data: user.UserUpdateData
    ): Promise<NativeError | Types.ObjectId> {
      const { username, password, newUsername } = data;
      const result = await this.login(username, password);
      if (Types.ObjectId.isValid(result as Types.ObjectId)) {
        const id = result as Types.ObjectId;
        switch (type) {
          case "username": {
            const result = await User.findOne({ username: newUsername });
            return result
              ? <NativeError>(
                  new User().invalidate(
                    "newUsername",
                    "Username already in use.",
                    newUsername
                  )
                )
              : await User.findOneAndUpdate(
                  { username },
                  { username: newUsername },
                  { runValidators: true }
                )
                  .then(() => id)
                  .catch((err) => err);
          }
          case "password": {
            return id;
          }
          default: {
            throw new Error("Something went wrong when updating a profile.");
          }
        }
      } else return result;
    }
  );
}
