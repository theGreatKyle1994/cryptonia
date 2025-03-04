import type { user } from "../types";
import { Schema, model } from "mongoose";

type UserDoc = user.UserDoc;
type UserModel = user.UserModel;
type UserVirtuals = user.UserVirtuals;

const UserSchema = new Schema<UserDoc, UserModel, UserVirtuals>(
  {
    username: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    favorites: [{ type: String }],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);
export default User;
