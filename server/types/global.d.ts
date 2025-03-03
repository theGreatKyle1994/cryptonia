import type { JwtPayload } from "jsonwebtoken";
import type { Model } from "mongoose";

export interface Payload extends JwtPayload {
  userId: string;
}

export interface BodyData {
  username: string;
  password: string;
  confirmPassword?: string;
  newUsername?: string;
  userId: string;
}

export interface Cookies {
  userToken: string;
}

export namespace User {
  interface UserDoc {
    username: string;
    password: string;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
  }

  interface UserVirtuals {
    confirmPassword: string;
  }

  type UserModel = Model<UserDoc, {}, UserVirtuals>;
}
