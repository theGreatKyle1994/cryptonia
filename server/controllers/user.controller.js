const User = require("../models/user.model");

module.exports.findAllUsers = (_, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((newUser) => res.json(newUser))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
