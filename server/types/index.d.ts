import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
import type { Model, Schema } from "mongoose";

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

  interface UserDoc {
    username: string;
    password: string;
    favorites: string[];
  }

  interface UserVirtuals {
    _confirmPassword: string;
  }

  type UserModel = Model<UserDoc, {}, UserVirtuals>;

  type UserSchema = Schema<UserDoc, UserModel, UserVirtuals>;

  interface UserRequest<ReqBody = BodyData> extends Request<{}, {}, ReqBody> {}
}
