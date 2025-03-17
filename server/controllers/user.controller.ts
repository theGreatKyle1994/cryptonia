import type { Environment } from "../types/env";
import { Types } from "mongoose";
import type { Request, Response } from "express";
import type { user } from "../types";
import User from "../models/user.model";
import * as jwt from "jsonwebtoken";

type UserRequest = user.UserRequest;
const { SECRET_KEY } = process.env as Environment;

const userController = {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    const users: (typeof User)[] | undefined = await User.find();
    res.status(200).json(users);
  },
  getFavorites: async (req: UserRequest, res: Response): Promise<void> => {
    await User.findById({ _id: req.body.userId }).then((user) =>
      user ? res.status(200).json(user.favorites) : res.status(400).end()
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
    await User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
          expiresIn: 86400000 * 365,
        });
        return res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            maxAge: 86400000 * 365,
          })
          .json({ userId: user._id, msg: "Success" });
      })
      .catch((err) => res.status(400).json(err));
  },
  login: async (req: UserRequest, res: Response): Promise<void> => {
    const result = await User.login(req.body.username, req.body.password);
    if (Types.ObjectId.isValid(result as Types.ObjectId)) {
      const id = result as Types.ObjectId;
      const userToken = jwt.sign({ userId: id }, SECRET_KEY, {
        expiresIn: 86400000 * 365,
      });
      res
        .status(200)
        .cookie("userToken", userToken, {
          httpOnly: true,
          maxAge: 86400000 * 365,
        })
        .json({ userId: id, msg: "Success" });
    } else {
      res.status(400).json(result);
    }
  },
  updateUser: async (req: UserRequest, res: Response): Promise<void> => {
    const result = await User.login(req.body.username, req.body.password);
    if (Types.ObjectId.isValid(result as Types.ObjectId)) {
      const id = result as Types.ObjectId;
      res.status(200).json({ userId: id });
    } else {
      res.status(400).json(result);
    }
  },
};

export default userController;
