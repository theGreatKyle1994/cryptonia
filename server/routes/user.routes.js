const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/user/login", UserController.login);
  app.post("/user/register", UserController.register);
  app.get("/user/:id", UserController.getFavorites);
  app.put("/user/fav", UserController.addFavorite);
  app.put("/user/fav/remove", UserController.removeFavorite);
};
