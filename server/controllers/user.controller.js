const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.getFavorites = async (req, res) => {
  await User.findById({ _id: req.body.userId })
    .then((user) => res.status(200).json(user.favorites))
    .catch(() => res.status(401).end());
};

module.exports.addFavorite = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.body.userId },
    { $addToSet: { favorites: req.body.fav } },
    { new: true, upsert: true }
  )
    .then(() => res.status(201).end())
    .catch(() => res.status(401).end());
};

module.exports.removeFavorite = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.body.userId },
    { $pull: { favorites: req.body.fav } }
  )
    .then(() => res.status(200).end())
    .catch(() => res.status(401).end());
};

module.exports.register = async (req, res) => {
  const alreadyUser = await User.findOne({ username: req.body.username });
  if (!alreadyUser) {
    await User.create(req.body)
      .then((newUser) => {
        const userToken = jwt.sign({ userId: newUser._id }, secret, {
          expiresIn: "1h",
        });
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
          })
          .json(newUser._id);
      })
      .catch(() => res.status(400).end());
  } else {
    return res.status(400).json({
      error: {
        errors: {
          username: { message: "User already registered." },
        },
      },
    });
  }
};

module.exports.login = async (req, res) => {
  await User.findOne({ username: req.body.username })
    .then(async (user) => {
      await bcrypt
        .compare(req.body.password, user.password)
        .then((correctPassword) => {
          if (correctPassword) {
            const userToken = jwt.sign({ userId: user._id }, secret, {
              expiresIn: "1h",
            });
            return res
              .status(200)
              .cookie("userToken", userToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
              })
              .json(user._id);
          } else
            return res.status(401).json({
              error: {
                errors: {
                  password: { message: "Incorrect password." },
                },
              },
            });
        });
    })
    .catch(() =>
      res.status(400).json({
        error: {
          errors: {
            username: { message: "User not found." },
          },
        },
      })
    );
};

module.exports.updateUser = async (req, res) => {
  await User.findOne({ username: req.body.username }).then(async (user) => {
    if (user) {
      if (req.body.usernameNew.length < 3) {
        return res.status(400).json({
          error: {
            usernameNew: {
              message: "New username must be at least 3 characters.",
            },
          },
        });
      } else {
        await User.findOne({
          username: req.body.usernameNew,
        }).then(async (prevUser) => {
          if (prevUser) {
            res.status(401).json({
              error: {
                usernameNew: { message: "Username already taken." },
              },
            });
          } else {
            await bcrypt
              .compare(req.body.password, user.password)
              .then(async (correctPassword) => {
                if (!correctPassword) {
                  res.status(401).json({
                    error: {
                      password: { message: "Incorrect password." },
                    },
                  });
                } else {
                  await User.findOneAndUpdate(
                    { username: req.body.username },
                    { username: req.body.usernameNew },
                    { new: true }
                  )
                    .then(() => {
                      res.status(200).json({
                        usernameNew:
                          "You have successfully changed your username.",
                      });
                    })
                    .catch(() => res.status(500).end());
                }
              });
          }
        });
      }
    } else {
      return res.status(401).json({
        error: {
          username: { message: "Incorrect Username" },
        },
      });
    }
  });
};
