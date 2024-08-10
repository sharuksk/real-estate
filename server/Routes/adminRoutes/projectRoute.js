const express = require("express");
const {
  addProject,
  editProject,
  deleteProjectById,
  listAllProjects,
  getProjectById,
  getAllProjects,
} = require("../../controllers/ProjectController/projectController");
const {
  addProperty,
  listProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
  getAllProperties,
} = require("../../controllers/ProjectController/propertiesController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");
const {
  adminMiddleware,
  allowAnyRole,
} = require("../../middlewares/roleMiddleware");
const projectRouter = express.Router();
//Projects
projectRouter.post("/add-project", isAuthenticated, allowAnyRole, addProject);
projectRouter.post(
  "/update-project",
  isAuthenticated,
  allowAnyRole,
  editProject
);
projectRouter.delete(
  "/delete-project/:projectId",
  isAuthenticated,
  allowAnyRole,
  deleteProjectById
);
projectRouter.get(
  "/get-project",
  isAuthenticated,
  allowAnyRole,
  listAllProjects
);
projectRouter.get(
  "/getAllproject",
  isAuthenticated,
  allowAnyRole,
  getAllProjects
);
projectRouter.get(
  "/get-project/:projectId",
  isAuthenticated,
  allowAnyRole,
  getProjectById
);

//Properties//
projectRouter.post("/add-property", isAuthenticated, allowAnyRole, addProperty);
projectRouter.delete(
  "/delete-property/:propertyId",
  isAuthenticated,
  allowAnyRole,
  deleteProperty
);
projectRouter.post(
  "/update-property/:id",
  isAuthenticated,
  allowAnyRole,
  updateProperty
);
projectRouter.get(
  "/list-property",
  isAuthenticated,
  adminMiddleware,
  listProperties
);
projectRouter.get(
  "/getAllProperty",
  isAuthenticated,
  allowAnyRole,
  getAllProperties
);
projectRouter.get(
  "/get-property/:propertyId",
  isAuthenticated,
  allowAnyRole,
  getPropertyById
);

module.exports = projectRouter;
