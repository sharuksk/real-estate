const Project = require("../../models/RealEstate/Project");
const Property = require("../../models/RealEstate/Property");

exports.addProject = async (req, res) => {
  try {
    const {
      projectName,
      location,
      area,
      description,
      coverImage,
      createdById,
      createdByType,
    } = req.body;

    if (
      !projectName ||
      !location ||
      !area ||
      !description ||
      !coverImage ||
      !createdById ||
      !createdByType
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are mandatory",
      });
    }

    let newProjectData = {
      projectName,
      location,
      area,
      description,
      coverImage,
    };

    if (createdByType === "User") {
      newProjectData.createdByUser = createdById;
    } else if (createdByType === "Admin") {
      newProjectData.createdByAdmin = createdById;
    }

    const newProject = await Project.create(newProjectData);
    await newProject.save();
    return res.status(200).json({
      message: "Project Created Successfully",
      success: true,
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unexpected Error,",
    });
  }
};
exports.editProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    const { projectName, location, area, description, coverImage } = req.body;
    if (projectName) project.projectName = projectName;
    if (location) project.location = location;
    if (area) project.area = area;
    if (description) project.description = description;
    if (coverImage) project.coverImage = coverImage;

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      updatedProject: project,
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
exports.deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
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
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId).populate("createdByUser");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      project,
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
exports.listAllProjects = async (req, res) => {
  try {
    const projectss = await Project.find();

    const projects = await Promise.all(
      projectss.map(async (project) => {
        const propertyCount = await Property.countDocuments({
          project: project._id,
        });
        return { ...project.toObject(), propertyCount };
      })
    );

    return res.status(200).json({
      success: true,
      projects,
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

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    // Total count of documents matching the search query
    const total = await Project.countDocuments({
      projectName: { $regex: search, $options: "i" },
    });

    // Fetch leads with pagination and search
    const projectss = await Project.find({
      projectName: { $regex: search, $options: "i" },
    })
      .skip(skip)
      .limit(parsedLimit)
      .exec();

    // Calculate totalPages and currentPage
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = parsedPage;

    const projects = await Promise.all(
      projectss.map(async (project) => {
        const propertyCount = await Property.countDocuments({
          project: project._id,
        });
        return { ...project.toObject(), propertyCount };
      })
    );

    res.status(200).json({
      success: true,
      message: "Project Fetched Successfully",
      projects,
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
