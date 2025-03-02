import type { ParamsDictionary } from "express-serve-static-core";
import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export interface Payload extends JwtPayload {
  userId: string;
}

interface BodyData {
  username: string;
  password: string;
  confirmPassword?: string;
  newUsername?: string;
  userId: string;
}

export interface CookieRequest<Params = ParamsDictionary, ResBody = any>
  extends Request<Params, ResBody, BodyData> {
  cookies: {
    userToken: string;
  };
}
