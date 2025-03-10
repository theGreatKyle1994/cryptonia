import type { user } from "../types";
import bcrypt from "bcrypt";

type UserSchema = user.UserSchema;

function setMiddleware(UserSchema: UserSchema) {
  UserSchema.pre("save", async function (next): Promise<void> {
    await bcrypt
      .hash(this.password, await bcrypt.genSalt())
      .then((hash) => (this.password = hash))
      .catch((err) =>
        this.invalidate("password", `Error in hashing password. ${err}`)
      );
    next();
  });
}

export default setMiddleware;
