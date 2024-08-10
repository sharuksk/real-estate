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
const {
  updateDetails,
  getAllUserDetails,
} = require("../../controllers/AdditionalDetailsController/Profile");
const {
  clientMiddleware,
  agentMiddleware,
  allowAnyRole,
} = require("../../middlewares/roleMiddleware");
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/register-admin", adminregister);
usersRouter.post("/login", login);
usersRouter.post("/logout", logout);
usersRouter.get("/checkAuth", isAuthenticated, checkAuthenticated);
usersRouter.get("/getAgent", getAllAgent);

//Route for Onboarding Form
usersRouter.post(
  "/update-profile",
  isAuthenticated,
  allowAnyRole,
  updateDetails
);
usersRouter.get(
  "/get-profile",
  isAuthenticated,
  clientMiddleware,
  agentMiddleware,
  getAllUserDetails
);

module.exports = usersRouter;
