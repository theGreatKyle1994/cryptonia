const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.query.username });
  if (!user)
    return res.json({
      error: {
        username: { message: "User not found." },
      },
    });
  const correctPassword = await bcrypt.compare(
    req.query.password,
    user.password
  );
  if (!correctPassword) {
    return res.json({
      error: {
        password: { message: "Incorrect password." },
      },
    });
  }
  return res.json({ msg: "success!" });
};
