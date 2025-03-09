import { Schema, model } from "mongoose";

const UserSchema = new Schema(
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
    favorites: [{ type: String }],
  },
  { timestamps: true }
);

UserSchema.path("username").validate(async function (
  value: string
): Promise<void> {
  if (await User.findOne({ username: value }))
    this.invalidate("username", "Username already taken.");
});

const User = model("User", UserSchema);
export default User;
