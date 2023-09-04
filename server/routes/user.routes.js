const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/user/login", UserController.login);
  app.post("/api/user/register", UserController.register);
  app.get("/api/user/:id", UserController.getFavorites);
  app.put("/api/user/fav", UserController.addFavorite);
  app.put("/api/user/fav/remove", UserController.removeFavorite);
  app.put("/api/user/update/:id", UserController.updateUser);
};
