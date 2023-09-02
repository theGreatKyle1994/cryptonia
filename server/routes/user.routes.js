const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/user/login", UserController.login);
  app.get("/user/:id", UserController.getFavorites);
  app.post("/user/register", UserController.register);
};
