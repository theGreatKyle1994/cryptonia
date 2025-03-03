import type { Request, Response, NextFunction } from "express";
import type { Cookies, user } from "../types";
import type { Environment } from "../types/env";
import * as jwt from "jsonwebtoken";

type UserPayload = user.UserPayload;
const { SECRET_KEY } = process.env as Environment;

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userToken } = req.cookies as Cookies;
  jwt.verify(userToken, SECRET_KEY, (err, decoded) => {
    if (err) res.status(401).end();
    else {
      const { userId } = decoded as UserPayload;
      req.body.userId = userId;
      next();
    }
  });
};

export default authenticate;
