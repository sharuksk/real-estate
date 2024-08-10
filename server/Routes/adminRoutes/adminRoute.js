const express = require("express");
const {
  createClient,
  updateClient,
  getClients,
  getClientById,
  createAgent,
  updateAgent,
  getAgent,
  getAgenttById,
  createOwner,
  updateOwner,
  getAllOwners,
  getOwnerById,
  removeClient,
  removeAgent,
  deleteOwner,
} = require("../../controllers/UserDetailsController/userDetailsController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");
const {
  adminMiddleware,
  allowAdminAgentRole,
} = require("../../middlewares/roleMiddleware");
const adminRouter = express.Router();
//Client
adminRouter.post(
  "/add-client",
  isAuthenticated,
  allowAdminAgentRole,
  createClient
);
adminRouter.put(
  "/update-client",
  isAuthenticated,
  allowAdminAgentRole,
  updateClient
);
adminRouter.get(
  "/list-clients",
  isAuthenticated,
  allowAdminAgentRole,
  getClients
);
adminRouter.get(
  "/client/:id",
  isAuthenticated,
  allowAdminAgentRole,
  getClientById
);
adminRouter.delete(
  "/remove-client/:id",
  isAuthenticated,
  allowAdminAgentRole,
  removeClient
);
//Agent
adminRouter.post("/add-agent", isAuthenticated, adminMiddleware, createAgent);
adminRouter.put("/update-agent", isAuthenticated, adminMiddleware, updateAgent);
adminRouter.get("/list-agents", isAuthenticated, allowAdminAgentRole, getAgent);
adminRouter.get("/agent/:id", isAuthenticated, adminMiddleware, getAgenttById);
adminRouter.delete(
  "/remove-agent",
  isAuthenticated,
  adminMiddleware,
  removeAgent
);
//Owner
adminRouter.post("/add-owner", isAuthenticated, adminMiddleware, createOwner);
adminRouter.put(
  "/update-owner/:id",
  isAuthenticated,
  adminMiddleware,
  updateOwner
);
adminRouter.get("/list-owner", isAuthenticated, adminMiddleware, getAllOwners);
adminRouter.get("/owner/:id", isAuthenticated, adminMiddleware, getOwnerById);
adminRouter.delete(
  "/delete-owner/:id",
  isAuthenticated,
  adminMiddleware,
  deleteOwner
);

module.exports = adminRouter;
