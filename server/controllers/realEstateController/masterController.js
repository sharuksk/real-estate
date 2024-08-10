const amenitySchema = require("../../models/RealEstate/amenitySchema");
const propertyType = require("../../models/RealEstate/propertyType");
const sourceSchema = require("../../models/RealEstate/sourceSchema");

exports.addAmenity = async (req, res) => {
  try {
    const { amenityname } = req.body;
    const role = req.user.role;

    const newAmenity = new amenitySchema({
      amenityname,
      createdBy: role,
    });

    await newAmenity.save();

    return res.status(201).json({
      message: "Amenity created successfully",
      amenity: newAmenity,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};
exports.deleteAmenity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete params from amenut", id);

    const deletedAmenity = await amenitySchema.findByIdAndDelete(id);

    if (!deletedAmenity) {
      return res.status(404).json({
        message: "Amenity not found",
      });
    }

    return res.status(200).json({
      message: "Amenity deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};
exports.listAmenity = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    if (isNaN(parsedPage) || parsedPage < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page number" });
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return res.status(400).json({ success: false, message: "Invalid limit" });
    }
    const total = await amenitySchema.countDocuments({
      amenityname: { $regex: search, $options: "i" },
    });
    const amenities = await amenitySchema
      .find({
        amenityname: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(parsedLimit)
      .exec();
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = Math.min(parsedPage, totalPages);
    res.status(200).json({
      success: true,
      message: "Amenity Fetched Successfully",
      amenities,
      totalPages,
      currentPage,
      totalCount: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await amenitySchema.find();
    return res.status(200).json({
      success: true,
      amenities,
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

exports.addSource = async (req, res) => {
  try {
    const { sourcename } = req.body;
    const role = req.user.role;

    const newSource = new sourceSchema({
      sourcename,
      createdBy: role,
    });
    await newSource.save();
    return res.status(201).json({
      message: "Source created successfully",
      source: newSource,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};

exports.deleteSource = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete params from amenut", id);

    const deletedSource = await sourceSchema.findByIdAndDelete(id);

    if (!deletedSource) {
      return res.status(404).json({
        message: "Source not found",
      });
    }

    return res.status(200).json({
      message: "Source deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};

exports.listSource = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    if (isNaN(parsedPage) || parsedPage < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page number" });
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return res.status(400).json({ success: false, message: "Invalid limit" });
    }
    const total = await sourceSchema.countDocuments({
      sourcename: { $regex: search, $options: "i" },
    });
    const source = await sourceSchema
      .find({
        sourcename: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(parsedLimit)
      .exec();
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = Math.min(parsedPage, totalPages);
    res.status(200).json({
      success: true,
      message: "Source Fetched Successfully",
      source,
      totalPages,
      currentPage,
      totalCount: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.getAllSource = async (req, res) => {
  try {
    const { Id } = req.params;
    console.log(Id);

    const source = await sourceSchema.findById(Id);

    if (!source) {
      return res.status(404).json({
        success: false,
        message: "source Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      source,
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

//Property Type Schema ///
exports.addPropertyType = async (req, res) => {
  try {
    const { propertyTypeName } = req.body;
    const role = req.user.role;

    const newpropertyType = new propertyType({
      propertyTypeName,
      createdBy: role,
    });

    await newpropertyType.save();

    return res.status(201).json({
      message: "New Property Type created successfully",
      newproperty: newpropertyType,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};
exports.deletepropertyType = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete params from amenut", id);

    const deletedpropertyType = await propertyType.findByIdAndDelete(id);

    if (!deletedpropertyType) {
      return res.status(404).json({
        message: "Property Type not found",
      });
    }

    return res.status(200).json({
      message: "Property Type deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unexpected Error",
      error: error.message,
    });
  }
};
exports.listPropertyType = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    if (isNaN(parsedPage) || parsedPage < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page number" });
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return res.status(400).json({ success: false, message: "Invalid limit" });
    }
    const total = await propertyType.countDocuments({
      propertyTypeName: { $regex: search, $options: "i" },
    });
    const listpropertyType = await propertyType
      .find({
        propertyTypeName: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(parsedLimit)
      .exec();
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = Math.min(parsedPage, totalPages);
    res.status(200).json({
      success: true,
      message: "Amenity Fetched Successfully",
      listpropertyType,
      totalPages,
      currentPage,
      totalCount: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Unexpected Error",
    });
  }
};

exports.getAllPropertyType = async (req, res) => {
  try {
    const { Id } = req.params;
    console.log(Id);

    const property = await propertyType.findById(Id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "propertyType Not Found",
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
