const express = require("express");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");
const {
  addAmenity,
  deleteAmenity,
  listAmenity,
  addSource,
  deleteSource,
  listSource,
  addPropertyType,
  deletepropertyType,
  listPropertyType,
  getAllAmenities,
} = require("../../controllers/realEstateController/masterController");
const {
  createLead,
  deleteLead,
  getLeadById,
  updateLead,
  getLeadSource,
  getLeadPropertyType,
  getAllLeads,
} = require("../../controllers/realEstateController/leadController");
const {
  adminMiddleware,
  allowAdminAgentRole,
  allowAnyRole,
} = require("../../middlewares/roleMiddleware");
const masterRouter = express.Router();
//**Amenity  */
masterRouter.post("/add-amenity", isAuthenticated, adminMiddleware, addAmenity);
masterRouter.delete(
  "/delete-amenity/:id",
  isAuthenticated,
  adminMiddleware,
  deleteAmenity
);
masterRouter.get(
  "/list-amenity",
  isAuthenticated,
  adminMiddleware,
  listAmenity
);
masterRouter.get("/getAmenity", isAuthenticated, allowAnyRole, getAllAmenities);

//**Source  */
masterRouter.post("/add-source", isAuthenticated, adminMiddleware, addSource);
masterRouter.delete(
  "/delete-source/:id",
  isAuthenticated,
  adminMiddleware,
  deleteSource
);
masterRouter.get("/list-source", isAuthenticated, adminMiddleware, listSource);

//**Property Type */
masterRouter.post(
  "/add-propertyType",
  isAuthenticated,
  adminMiddleware,
  addPropertyType
);
masterRouter.delete(
  "/delete-propertyType/:id",
  isAuthenticated,
  adminMiddleware,
  deletepropertyType
);
masterRouter.get(
  "/list-propertyType",
  isAuthenticated,
  adminMiddleware,
  listPropertyType
);
//**Lead */
masterRouter.post(
  "/add-lead",
  isAuthenticated,
  allowAdminAgentRole,
  createLead
);
masterRouter.delete(
  "/delete-lead/:id",
  isAuthenticated,
  adminMiddleware,
  deleteLead
);
masterRouter.get(
  "/list-lead",
  isAuthenticated,
  allowAdminAgentRole,
  getAllLeads
);
masterRouter.get(
  "/get-lead/:id",
  isAuthenticated,
  allowAdminAgentRole,
  getLeadById
);
masterRouter.put(
  "/update-lead/:id",
  isAuthenticated,
  adminMiddleware,
  updateLead
);

//"lead listing"
masterRouter.get(
  "/list-leadsource",
  isAuthenticated,
  allowAdminAgentRole,
  getLeadSource
);
masterRouter.get(
  "/list-type",
  isAuthenticated,
  allowAdminAgentRole,
  getLeadPropertyType
);

module.exports = masterRouter;
