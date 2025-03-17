import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
import type { Model, Schema, Types } from "mongoose";

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

  interface UserUpdateData {
    username: string;
    password: string;
    newUsername?: string;
  }

  interface UserMethods {}

  interface UserStatics {
    login(
      this: UserModel,
      username: string,
      password: string
    ): Promise<NativeError | Types.ObjectId>;
    updateProfile(
      this: UserModel,
      data: UserUpdateData
    ): Promise<NativeError | Types.ObjectId>;
  }

  interface UserVirtuals {
    _confirmPassword: string;
  }

  interface UserModel
    extends Model<UserDoc, UserMethods, UserVirtuals>,
      UserStatics {}

  type UserSchema = Schema<
    UserDoc,
    UserModel,
    UserMethods,
    {},
    UserVirtuals,
    UserStatics
  >;

  interface UserRequest<ReqBody = BodyData> extends Request<{}, {}, ReqBody> {}
}
