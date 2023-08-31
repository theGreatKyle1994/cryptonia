const User = require("../models/user.model");

module.exports.findAllUsers = (_, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
