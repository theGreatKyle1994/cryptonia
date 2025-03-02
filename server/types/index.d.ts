import type { JwtPayload } from "jsonwebtoken";

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
