import type { Response, NextFunction } from "express";
import type { CookieRequest, Payload } from "../types";
import * as jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env as { SECRET_KEY: string };

const authenticate = (
  req: CookieRequest,
  res: Response,
  next: NextFunction
): void => {
  jwt.verify(req.cookies.userToken, SECRET_KEY, (err, decoded) => {
    if (!err && decoded) {
      const { userId } = decoded as Payload;
      req.body.userId = userId;
      next();
    } else res.status(401).end();
  });
};

export default authenticate;
