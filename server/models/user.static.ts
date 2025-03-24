import type { user } from "../types";
import User from "../models/user.model";
import bcrypt from "bcrypt";

type UserSchema = user.UserSchema;

export function setStatics(UserSchema: UserSchema) {
  UserSchema.static(
    "login",
    async function (
      username: string,
      password: string
    ): Promise<NativeError | user.UserLoginData> {
      const account = await this.findOne({ username });
      if (account)
        return (await bcrypt.compare(password, account.password))
          ? {
              username: account.username,
              id: account._id,
              message: "Successfully logged in.",
            }
          : <NativeError>(
              new User().invalidate(
                "password",
                "Incorrect password.",
                password,
                "invalid"
              )
            );
      else
        return <NativeError>(
          new User().invalidate(
            "username",
            "Username not found.",
            username,
            "invalid"
          )
        );
    }
  );

  UserSchema.static(
    "updateProfile",
    async function (
      type: string,
      data: user.UserUpdateData
    ): Promise<NativeError | user.UserLoginData> {
      const { username, password, newUsername } = data;
      const result = await this.login(username, password);
      if (Object.hasOwn(result, "id")) {
        const { id } = result as user.UserLoginData;
        switch (type) {
          case "username": {
            if (!newUsername)
              return <NativeError>(
                new User().invalidate(
                  "newUsername",
                  "New username is required.",
                  newUsername
                )
              );
            else if (newUsername.length < 3)
              return <NativeError>(
                new User().invalidate(
                  "newUsername",
                  "New username must be at least 3 characters.",
                  newUsername
                )
              );
            const result = await User.findOne({ username: newUsername });
            if (result)
              return <NativeError>(
                new User().invalidate(
                  "newUsername",
                  "Username already in use.",
                  newUsername
                )
              );
            else
              return await User.findOneAndUpdate(
                { username },
                { username: newUsername },
                { runValidators: true }
              )
                .then(() => ({
                  username: newUsername,
                  id,
                  message: "Successfully updated username.",
                }))
                .catch((err) => err);
          }
          case "password": {
            return {
              username: "",
              id,
              message: "Successfully changed password.",
            };
          }
          default: {
            throw new Error("Something went wrong when updating a profile.");
          }
        }
      } else return result;
    }
  );
}
