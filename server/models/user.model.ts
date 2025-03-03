import { Schema, model, PreMiddlewareFunction } from "mongoose";
import * as bcrypt from "bcrypt";

const UserSchema = new Schema<User>(
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("confirmPassword")
  .get(() => this.confirmPassword)
  .set((value) => (this.confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Passwords must match.");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = model<User>("User", UserSchema);
export default User;
