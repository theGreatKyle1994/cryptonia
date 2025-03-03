import type { Request, Response, NextFunction } from "express";
import type { Environment } from "../types/env";
import * as jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env as Environment;

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userToken } = req.cookies as Cookies;
  jwt.verify(userToken, SECRET_KEY, (err, decoded) => {
    if (!err && decoded) {
      const { userId } = decoded as Payload;
      req.body.userId = userId;
      next();
    } else res.status(401).end();
  });
};

export default authenticate;
