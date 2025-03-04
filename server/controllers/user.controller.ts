import type { Environment } from "../types/env";
import type { Response } from "express";
import type { user } from "../types";
import User from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

type UserRequest = user.UserRequest;
const { SECRET_KEY } = process.env as Environment;

const userController = {
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
  register: async (req: UserRequest, res: Response): Promise<void> => {},
  login: async (req: UserRequest, res: Response): Promise<void> => {},
  updateUser: async (req: UserRequest, res: Response): Promise<void> => {},
};

export default userController;
