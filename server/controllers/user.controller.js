const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.getFavorites = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => res.json(user.favorites))
    .catch((err) => res.json({ error: err }));
};

module.exports.addFavorite = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.id },
    { $addToSet: { favorites: req.body.fav } },
    { new: true, upsert: true }
  )
    .then((res) => res.json("Success"))
    .catch((err) => res.json({ error: err }));
};

module.exports.removeFavorite = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.id },
    { $pull: { favorites: req.body.fav } }
  )
    .then((res) => res.json("Sucess"))
    .catch((err) => res.json({ error: err }));
};

module.exports.register = async (req, res) => {
  const alreadyUser = await User.findOne({ username: req.body.username });

  if (!alreadyUser) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) =>
        res.json({ message: "Something went wrong", error: err })
      );
  } else {
    return res.json({
      error: {
        errors: {
          username: { message: "User already registered." },
        },
      },
    });
  }
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

  if (!correctPassword)
    return res.json({
      error: {
        password: { message: "Incorrect password." },
      },
    });

  return res.json(user._id);
};

module.exports.updateUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user)
    return res.json({
      error: {
        username: { message: "Incorrect Username" },
      },
    });

  if (req.body.usernameNew.length < 3)
    return res.json({
      error: {
        usernameNew: { message: "New username must be at least 3 characters." },
      },
    });

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!correctPassword)
    return res.json({
      error: {
        password: { message: "Incorrect password." },
      },
    });

  const alreadyUser = await User.findOne({ username: req.body.usernameNew });
  if (alreadyUser)
    return res.json({
      error: {
        usernameNew: { message: "Username already taken." },
      },
    });

  await User.findOneAndUpdate(
    { username: req.body.username },
    { username: req.body.usernameNew },
    { new: true }
  );

  return res.json({
    usernameNew: { message: "Successfully updated username." },
  });
};
