const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/users", UserController.findAllUsers);
  app.post("/user/create", UserController.createUser);
};
