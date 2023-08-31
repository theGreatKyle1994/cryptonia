const UserController = require("../controllers/user.controller");

module.exports = (app) => {
  // TODO routes
  app.get("/users", UserController.findAllUsers);
};
