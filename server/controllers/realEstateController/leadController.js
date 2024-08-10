const leadSchema = require("../../models/RealEstate/leadSchema");
const propertyTypeSchema = require("../../models/RealEstate/propertyType");
const sourceSchema = require("../../models/RealEstate/sourceSchema");
const agentSchema = require("../../models/Users/agentSchema");
exports.createLead = async (req, res) => {
  try {
    const {
      leadName,
      contact,
      email,
      location,
      propertyType,
      source,
      agentName,
      createdById,
      createdByType,
    } = req.body;
    ///agent change
    if (propertyType) {
      const propertyTypeExists = await propertyTypeSchema.findById(
        propertyType
      );
      if (!propertyTypeExists)
        return res.status(400).json({ message: "Invalid property type ID" });
    }

    const sourceExists = await sourceSchema.findById(source);
    if (!sourceExists)
      return res.status(400).json({ message: "Invalid source ID" });
    const agentExists = await agentSchema.findById(agentName);
    if (!agentExists)
      return res.status(400).json({ message: "Invalid property type ID" });

    let newLeadData = {
      contact,
      email,
      location,
      leadName,
      propertyType,
      source,
      agentName,
    };

    if (createdByType === "User") {
      newLeadData.createdByUser = createdById;
    } else if (createdByType === "Admin") {
      newLeadData.createdByAdmin = createdById;
    }

    const newLead = new leadSchema(newLeadData);

    await newLead.save();
    res.status(201).json({
      message: "Lead created successfully",
      newLead,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Get a lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the request parameters
    const lead = await leadSchema
      .findById(id) // Fetch lead by ID
      .populate("propertyType") // Populate propertyType field
      .populate("source") // Populate source field
      .populate("agentName") // Populate agentName field
      .populate("createdByUser");
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({
      message: "Lead Fetched Successfully",
      lead,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Update a lead by ID
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      leadName,
      contact,
      email,
      location,
      propertyType,
      source,
      agentName,
    } = req.body;

    if (propertyType) {
      const propertyTypeExists = await propertyTypeSchema.findById(
        propertyType
      );
      if (!propertyTypeExists)
        return res.status(400).json({ message: "Invalid property type ID" });
    }

    // Validate source ID
    const sourceExists = await sourceSchema.findById(source);
    if (!sourceExists)
      return res.status(400).json({ message: "Invalid source ID" });

    // Validate agent ID
    const agentExists = await agentSchema.findById(agentName);
    if (!agentExists)
      return res.status(400).json({ message: "Invalid agent ID" });

    // Update the lead
    const updatedLead = await leadSchema.findByIdAndUpdate(
      id,
      {
        leadName,
        contact,
        email,
        location,
        propertyType,
        source,
        agentName,
      },
      { new: true }
    );

    if (!updatedLead)
      return res.status(404).json({ message: "Lead not found" });

    res.status(200).json({
      message: "Lead updated successfully",
      updatedLead,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Delete a lead by ID
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await leadSchema.findByIdAndDelete(id);

    if (!deletedLead)
      return res.status(404).json({ message: "Lead not found" });

    res.status(200).json({
      message: "Lead deleted successfully",
      deletedLead,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Get all leads
exports.getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    // Total count of documents matching the search query
    const total = await leadSchema.countDocuments({
      leadName: { $regex: search, $options: "i" },
    });

    let query = {
      leadName: { $regex: search, $options: "i" },
    };

    if (req.user.role !== "Admin") {
      query.createdByUser = req.user.id;
    }

    // Fetch leads with pagination and search
    const leads = await leadSchema
      .find(query)
      .skip(skip)
      .limit(parsedLimit)
      .populate("propertyType")
      .populate("source")
      .populate("agentName")
      .exec();

    // Calculate totalPages and currentPage
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = parsedPage;

    res.status(200).json({
      success: true,
      message: "List Fetched Successfully",
      leads,
      totalPages,
      currentPage,
      totalCount: total,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

exports.getLeadSource = async (req, res) => {
  try {
    const sources = await sourceSchema.find().populate();
    return res.status(200).json({
      message: "Source of Lead Fetched Succcessfully",
      sources,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unexpcted Error",
    });
  }
};
exports.getLeadPropertyType = async (req, res) => {
  try {
    const propertyTypes = await propertyTypeSchema.find().populate();
    return res.status(200).json({
      message: "Property Type Fetched Successfully",
      propertyTypes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unexpected Error",
    });
  }
};
