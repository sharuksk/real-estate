const express = require("express");
const {
  register,
  login,
  logout,
  checkAuthenticated,
  adminregister,
  getAllAgent,
} = require("../../controllers/AdminControllers/AdminController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/register-admin", adminregister);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.get("/checkAuth", isAuthenticated, checkAuthenticated);
usersRouter.get("/getAgent", getAllAgent);

module.exports = usersRouter;
