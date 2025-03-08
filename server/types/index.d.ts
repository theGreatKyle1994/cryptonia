import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

export interface Cookies {
  userToken: string;
}

export interface BodyData {
  username: string;
  password: string;
  confirmPassword: string;
  newUsername: string;
  userId: string;
  fav?: string;
}

export namespace user {
  interface UserPayload extends JwtPayload {
    userId: string;
  }

  interface UserRequest<ReqBody = BodyData> extends Request<{}, {}, ReqBody> {}
}
