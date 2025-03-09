import type { Express } from "express";
import userController from "../controllers/user.controller";
import authenticate from "../config/jwt.auth";

const routes = (app: Express): void => {
  app.get("/api/users", userController.getAllUsers);
  app.post("/api/user/register", userController.register);
  app.post("/api/user/login", userController.login);
  app.get("/api/user/fav", authenticate, userController.getFavorites);
  app.post("/api/user/fav", authenticate, userController.addFavorite);
  app.put("/api/user/fav", authenticate, userController.removeFavorite);
  app.put("/api/user/update", authenticate, userController.updateUser);
};

export default routes;
