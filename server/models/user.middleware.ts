import type { user } from "../types";
import bcrypt from "bcrypt";

type UserSchema = user.UserSchema;

export function setMiddleware(UserSchema: UserSchema) {
  UserSchema.pre("save", async function (next): Promise<void> {
    await bcrypt
      .hash(this.password, await bcrypt.genSalt(5))
      .then((hash) => (this.password = hash))
      .catch((err) =>
        this.invalidate("password", `Error in hashing password. ${err}`)
      );
    next();
  });
}
