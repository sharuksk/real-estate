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
  getAllSource,
  getAllPropertyType,
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
  allowAdminOwnerRole,
} = require("../../middlewares/roleMiddleware");
const masterRouter = express.Router();
//**Amenity  */
masterRouter.post(
  "/add-amenity",
  isAuthenticated,
  allowAdminOwnerRole,
  addAmenity
);
masterRouter.delete(
  "/delete-amenity/:id",
  isAuthenticated,
  allowAdminOwnerRole,
  deleteAmenity
);
masterRouter.get(
  "/list-amenity",
  isAuthenticated,
  allowAdminOwnerRole,
  listAmenity
);
masterRouter.get("/getAmenity", isAuthenticated, allowAnyRole, getAllAmenities);

//**Source  */
masterRouter.post(
  "/add-source",
  isAuthenticated,
  allowAdminOwnerRole,
  addSource
);
masterRouter.delete(
  "/delete-source/:id",
  isAuthenticated,
  allowAdminOwnerRole,
  deleteSource
);
masterRouter.get(
  "/list-source",
  isAuthenticated,
  allowAdminOwnerRole,
  listSource
);

masterRouter.get(
  "/getAllsource/:Id",
  isAuthenticated,
  allowAdminOwnerRole,
  getAllSource
);

//**Property Type */
masterRouter.post(
  "/add-propertyType",
  isAuthenticated,
  allowAdminOwnerRole,
  addPropertyType
);
masterRouter.delete(
  "/delete-propertyType/:id",
  isAuthenticated,
  allowAdminOwnerRole,
  deletepropertyType
);
masterRouter.get(
  "/list-propertyType",
  isAuthenticated,
  allowAdminOwnerRole,
  listPropertyType
);

masterRouter.get(
  "/getAllpropertyType/:Id",
  isAuthenticated,
  allowAdminOwnerRole,
  getAllPropertyType
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
  allowAdminAgentRole,
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
  allowAnyRole,
  getLeadPropertyType
);

module.exports = masterRouter;
