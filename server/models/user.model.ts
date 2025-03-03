import type { user, BodyData } from "../types";
import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";

type UserDoc = user.UserDoc;
type UserModel = user.UserModel;
type UserVirtuals = user.UserVirtuals;

const UserSchema = new Schema<UserDoc, UserModel, UserVirtuals>(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minLength: [3, "Username requires at least 3 characters."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [3, "Password requires at least 3 characters."],
      trim: true,
    },
    favorites: [{ type: String }],
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(function () {
    return this.confirmPassword;
  })
  .set(function (value: BodyData["confirmPassword"]) {
    if (value) this.confirmPassword = value;
  });

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match.");
  }
  next();
});

UserSchema.pre("save", async function (next) {
  await bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = model("User", UserSchema);
export default User;
