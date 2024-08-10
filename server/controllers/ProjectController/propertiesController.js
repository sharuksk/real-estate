const Project = require("../../models/RealEstate/Project");
const Property = require("../../models/RealEstate/Property");
const userSchema = require("../../models/Users/userSchema");
const propertyTypeSchema = require("../../models/RealEstate/propertyType");
const amenitySchema = require("../../models/RealEstate/amenitySchema");
exports.addProperty = async (req, res) => {
  try {
    const {
      description,
      propertyName,
      project,
      propertyType,
      referenceAgent,
      price,
      amenities,
      loan,
      city,
      projectArea,
      propertyAge,
      coverImage,
      createdById,
      createdByType,
    } = req.body;

    const [
      projectExists,
      propertyTypeExists,
      referenceAgentExists,
      amenitiesExists,
    ] = await Promise.all([
      Project.findById(project),
      propertyTypeSchema.findById(propertyType),
      referenceAgent
        ? userSchema.findById(referenceAgent)
        : Promise.resolve(null),
      Promise.all(amenities.map((id) => amenitySchema.findById(id))),
    ]);

    if (!projectExists)
      return res.status(400).json({ error: "Project not found" });
    if (!propertyTypeExists)
      return res.status(400).json({ error: "Property Type not found" });
    if (referenceAgent && !referenceAgentExists)
      return res.status(400).json({ error: "Reference Agent not found" });
    if (amenities.length && amenitiesExists.some((amenity) => !amenity))
      return res.status(400).json({ error: "One or more Amenities not found" });

    let newPropertiesData = {
      description,
      propertyName,
      project,
      propertyType,
      referenceAgent,
      price,
      amenities,
      loan,
      city,
      projectArea,
      propertyAge,
      coverImage,
    };

    if (createdByType === "User") {
      newPropertiesData.createdByUser = createdById;
    } else if (createdByType === "Admin") {
      newPropertiesData.createdByAdmin = createdById;
    }

    const property = new Property(newPropertiesData);

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.listProperties = async (req, res) => {
  try {
    const findProject = await Property.find().populate("project");
    return res.status(200).json({
      success: true,
      message: "Property fetched Successfully",
      findProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
    });
  }
};
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      description,
      propertyName,
      project,
      propertyType,
      referenceAgent,
      price,
      amenities,
      loan,
      city,
      projectArea,
      propertyAge,
      coverImage,
    } = req.body;

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ error: "Property not found" });

    const [
      projectExists,
      propertyTypeExists,
      referenceAgentExists,
      amenitiesExists,
    ] = await Promise.all([
      project ? Project.findById(project) : Promise.resolve(null),
      propertyType
        ? propertyTypeSchema.findById(propertyType)
        : Promise.resolve(null),
      referenceAgent
        ? userSchema.findById(referenceAgent)
        : Promise.resolve(null),
      amenities && amenities.length
        ? Promise.all(amenities.map((id) => amenitySchema.findById(id)))
        : Promise.resolve([]),
    ]);

    if (project && !projectExists)
      return res.status(400).json({ error: "Project not found" });
    if (propertyType && !propertyTypeExists)
      return res.status(400).json({ error: "Property Type not found" });
    if (referenceAgent && !referenceAgentExists)
      return res.status(400).json({ error: "Reference Agent not found" });
    if (
      amenities &&
      amenities.length &&
      amenitiesExists.some((amenity) => !amenity)
    )
      return res.status(400).json({ error: "One or more Amenities not found" });

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        description: description || property.description,
        propertyName: propertyName || property.propertyName,
        project: project || property.project,
        propertyType: propertyType || property.propertyType,
        referenceAgent: referenceAgent || property.referenceAgent,
        price: price || property.price,
        amenities: amenities || property.amenities,
        loan: loan !== undefined ? loan : property.loan,
        city: city || property.city,
        projectArea: projectArea || property.projectArea,
        propertyAge: propertyAge || property.propertyAge,
        coverImage: coverImage || property.coverImage,
      },
      { new: true }
    );

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
exports.deleteProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    return res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const property = await Property.findById(propertyId).populate(
      "project referenceAgent amenities propertyType createdByUser"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      property,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    // Total count of documents matching the search query
    const total = await Property.countDocuments({
      propertyName: { $regex: search, $options: "i" },
    });

    // Fetch leads with pagination and search
    const properties = await Property.find({
      propertyName: { $regex: search, $options: "i" },
    })
      .skip(skip)
      .limit(parsedLimit)
      .populate("project")
      .exec();

    // Calculate totalPages and currentPage
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = parsedPage;

    res.status(200).json({
      success: true,
      message: "List Fetched Successfully",
      properties,
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
