import type { Environment } from "../types/env";
import type { Response } from "express";
import type { user } from "../types";
import type { MongooseError } from "mongoose";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

type UserRequest = user.UserRequest;
const { SECRET_KEY } = process.env as Environment;

const userController = {
  getFavorites: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findById({ _id: req.body.userId }).then((user) =>
      res.status(200).json(user!.favorites)
    );
  },
  addFavorite: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { favorites: req.body.fav } },
      { new: true, upsert: true }
    ).then(() => res.status(201).end());
  },
  removeFavorite: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $pull: { favorites: req.body.fav } }
    ).then(() => res.status(200).end());
  },
  register: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findOne({ username: req.body.username }).then(
      async (prevUser) => {
        if (!prevUser) {
          await User.create(req.body)
            .then((newUser) => {
              const userToken = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
                expiresIn: "1h",
              });
              res
                .status(201)
                .cookie("userToken", userToken, {
                  httpOnly: true,
                  maxAge: 1000 * 60 * 60,
                })
                .json({
                  successMsg: "Account successfully created.",
                  username: newUser.username,
                });
            })
            .catch((err: MongooseError) =>
              res.status(400).json({ error: err })
            );
        } else {
          return res.status(400).json({
            error: {
              errors: {
                username: { message: "User already registered." },
              },
            },
          });
        }
      }
    );
  },
  login: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findOne({ username: req.body.username }).then(async (user) => {
      if (user) {
        await bcrypt
          .compare(req.body.password, user.password)
          .then((correctPassword) => {
            if (correctPassword) {
              const userToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
                expiresIn: "1h",
              });
              return res
                .status(200)
                .cookie("userToken", userToken, {
                  httpOnly: true,
                  maxAge: 1000 * 60 * 60,
                })
                .json({
                  successMsg: "You have successfully logged in.",
                  username: user.username,
                });
            } else
              return res.status(401).json({
                error: {
                  errors: {
                    password: { message: "Incorrect password." },
                  },
                },
              });
          });
      } else {
        res.status(400).json({
          error: {
            errors: {
              username: { message: "User not found." },
            },
          },
        });
      }
    });
  },
  updateUser: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findOne({ username: req.body.username }).then(async (user) => {
      if (user) {
        if (req.body.newUsername.length < 3) {
          return res.status(400).json({
            error: {
              errors: {
                newUsername: {
                  message: "New username must be at least 3 characters.",
                },
              },
            },
          });
        } else {
          await User.findOne({
            username: req.body.newUsername,
          }).then(async (prevUser) => {
            if (prevUser) {
              res.status(401).json({
                error: {
                  errors: {
                    newUsername: { message: "Username already taken." },
                  },
                },
              });
            } else {
              await bcrypt
                .compare(req.body.password, user.password)
                .then(async (correctPassword) => {
                  if (!correctPassword) {
                    res.status(401).json({
                      error: {
                        errors: {
                          password: { message: "Incorrect password." },
                        },
                      },
                    });
                  } else {
                    await User.findOneAndUpdate(
                      { username: req.body.username },
                      { username: req.body.newUsername },
                      { new: true }
                    ).then((user) => {
                      res.status(200).json({
                        successMsg: `You have successfully changed your username to: ${req.body.newUsername}.`,
                        username: user!.username,
                      });
                    });
                  }
                });
            }
          });
        }
      } else {
        return res.status(401).json({
          error: {
            errors: {
              username: { message: "Incorrect Username" },
            },
          },
        });
      }
    });
  },
};

export default userController;
