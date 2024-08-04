const express = require("express");
const {
  addProject,
  editProject,
  deleteProjectById,
  listAllProjects,
  getProjectById,
} = require("../../controllers/ProjectController/projectController");
const {
  addProperty,
  listProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
} = require("../../controllers/ProjectController/propertiesController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");
const { adminMiddleware } = require("../../middlewares/roleMiddleware");
const projectRouter = express.Router();
//Projects
projectRouter.post(
  "/add-project",
  isAuthenticated,
  adminMiddleware,
  addProject
);
projectRouter.post(
  "/update-project",
  isAuthenticated,
  adminMiddleware,
  editProject
);
projectRouter.delete(
  "/delete-project/:projectId",
  isAuthenticated,
  adminMiddleware,
  deleteProjectById
);
projectRouter.get(
  "/get-project",
  isAuthenticated,
  adminMiddleware,
  listAllProjects
);
projectRouter.get(
  "/get-project/:projectId",
  isAuthenticated,
  adminMiddleware,
  getProjectById
);
//Properties//
projectRouter.post(
  "/add-property",
  isAuthenticated,
  adminMiddleware,
  addProperty
);
projectRouter.delete(
  "/delete-property/:propertyId",
  isAuthenticated,
  adminMiddleware,
  deleteProperty
);
projectRouter.put(
  "/update-property/:id",
  isAuthenticated,
  adminMiddleware,
  updateProperty
);
projectRouter.get(
  "/list-property",
  isAuthenticated,
  adminMiddleware,
  listProperties
);
projectRouter.get(
  "/get-property/:propertyId",
  isAuthenticated,
  adminMiddleware,
  getPropertyById
);

module.exports = projectRouter;
