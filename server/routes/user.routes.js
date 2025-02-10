const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.auth");

module.exports = (app) => {
  app.post("/api/user/login", UserController.login);
  app.post("/api/user/register", UserController.register);
  app.get("/api/user/fav", authenticate, UserController.getFavorites);
  app.post("/api/user/fav", authenticate, UserController.addFavorite);
  app.put("/api/user/fav", authenticate, UserController.removeFavorite);
  app.put("/api/user/update", authenticate, UserController.updateUser);
};
