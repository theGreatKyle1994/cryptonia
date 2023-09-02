const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/user/login", UserController.login);
  app.post("/user/register", UserController.register);
};
