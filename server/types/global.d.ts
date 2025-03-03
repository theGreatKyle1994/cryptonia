import type { JwtPayload } from "jsonwebtoken";

declare global {
  interface Payload extends JwtPayload {
    userId: string;
  }

  interface BodyData {
    username: string;
    password: string;
    confirmPassword?: string;
    newUsername?: string;
    userId: string;
  }

  interface Cookies {
    userToken: string;
  }

  interface User {
    username: string;
    password: string;
    favorites: string[];
    createdAt: string;
    updatedAt: string;
  }
}
