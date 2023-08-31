const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Userame is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
