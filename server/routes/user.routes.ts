import type { Express } from "express";
import UserController from "../controllers/user.controller";
import authenticate from "../config/jwt.auth";

const routes = (app: Express): void => {
  // app.post("/api/user/login", UserController.login);
  // app.post("/api/user/register", UserController.register);
  app.get("/api/user/fav", authenticate, UserController.getFavorites);
  app.post("/api/user/fav", authenticate, UserController.addFavorite);
  // app.put("/api/user/fav", authenticate, UserController.removeFavorite);
  // app.put("/api/user/update", authenticate, UserController.updateUser);
};

export default routes;
