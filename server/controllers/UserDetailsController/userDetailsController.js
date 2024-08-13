const Project = require("../../models/RealEstate/Project");
const sourceSchema = require("../../models/RealEstate/sourceSchema");
const agentSchema = require("../../models/Users/agentSchema");
const clientSchema = require("../../models/Users/clientSchema");
const ownerSchema = require("../../models/Users/ownerSchema");
exports.createClient = async (req, res) => {
  try {
    const {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      occupation,
      designation,
      organization,
      dob,
      preferredLanguage,
      city,
      pinCode,
      source,
      createdById,
      createdByType,
    } = req.body;

    const sourceExists = await sourceSchema.findById(source);
    if (!sourceExists)
      return res.status(400).json({ message: "Invalid source ID" });

    let newClientData = {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      occupation,
      designation,
      organization,
      dob,
      preferredLanguage,
      city,
      pinCode,
      source,
    };

    if (createdByType === "User") {
      newClientData.createdByUser = createdById;
    } else if (createdByType === "Admin") {
      newClientData.createdByAdmin = createdById;
    }

    const newClient = new clientSchema(newClientData);

    await newClient.save();
    return res.status(200).json({
      message: "Client Created Successfully By Admin",
      newClient,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Unexpected Error" });
  }
};

exports.getClients = async (req, res) => {
  try {
    if (req.user.role === "Admin") {
      const clients = await clientSchema.find().populate("source");

      return res.status(200).json({
        messsage: "Clients Details Fetched Successfully",
        clients,
      });
    } else {
      const clients = await clientSchema
        .find({ createdByUser: req.user.id })
        .populate("source");

      return res.status(200).json({
        messsage: "Clients Details Fetched Successfully",
        clients,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await clientSchema
      .findById(req.params.id)
      .populate("source");
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removeClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await clientSchema.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("The clietn for updating param sis", id);
    const {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      occupation,
      designation,
      organization,
      dob,
      preferredLanguage,
      city,
      pinCode,
      source,
    } = req.body;

    if (source) {
      const sourceExists = await sourceSchema.findById(source);
      if (!sourceExists)
        return res.status(400).json({ message: "Invalid source ID" });
    }

    const updatedClient = await clientSchema.findByIdAndUpdate(id, {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      occupation,
      designation,
      organization,
      dob,
      preferredLanguage,
      city,
      pinCode,
      source,
    });

    if (!updatedClient)
      return res.status(404).json({ message: "Client not found" });

    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//AGENT Controller//
exports.createAgent = async (req, res) => {
  try {
    const {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      occupation,
      designation,
      organization,
      dob,
      preferredLanguage,
      city,
      commissionInfo,
      pinCode,
      projects,
      licenseInfo,
    } = req.body;

    const projectsExists = await Project.findById(projects);
    if (!projectsExists)
      return res.status(400).json({ message: "Invalid source ID" });

    const newAgent = new agentSchema({
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      dob,
      city,
      pinCode,
      commissionInfo,
      licenseInfo,
      projects,
    });

    await newAgent.save();
    return res.status(200).json({
      message: "Client Created Successfully By Admin",
      newAgent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Unexpected Error" });
  }
};
exports.getAgent = async (req, res) => {
  try {
    const agents = await agentSchema.find().populate("projects");
    return res.status(200).json({
      messsage: "Clients Details Fetched Successfully",
      agents,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAgenttById = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await agentSchema.findById(id).populate("projects");

    if (!agent) return res.status(404).json({ message: "Agent not found" });
    return res.status(200).json({
      message: "Client Fetched Sucessfully",
      agent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removeAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const agent = await agentSchema.findByIdAndDelete(id);

    if (!agent) return res.status(404).json({ message: "Agent not found" });
    return res.status(200).json({
      message: "Client Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      dob,
      city,
      pinCode,
      licenseInfo,
      commissionInfo,
      projects,
    } = req.body;
    if (projects && Array.isArray(projects)) {
      for (const projectId of projects) {
        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
          return res
            .status(400)
            .json({ message: `Invalid project ID: ${projectId}` });
        }
      }
    }

    // Update the agent
    const updatedAgent = await agentSchema.findByIdAndUpdate(
      id,
      {
        name,
        contact,
        email,
        qatarId,
        address,
        state,
        dob,
        city,
        pinCode,
        commissionInfo,
        licenseInfo,
        projects,
      },
      { new: true }
    );

    if (!updatedAgent)
      return res.status(404).json({ message: "Agent not found" });

    res.status(200).json({
      message: "Agent updated successfully",
      updatedAgent,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error",
    });
  }
};
///Owner //
exports.createOwner = async (req, res) => {
  try {
    const {
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      dob,
      preferredLanguage,
      city,
      pinCode,
    } = req.body;

    const newOwner = new ownerSchema({
      name,
      contact,
      email,
      qatarId,
      address,
      state,
      dob,
      preferredLanguage,
      city,
      pinCode,
    });
    const findOwner = await ownerSchema.findOne({ email });
    if (findOwner) {
      return res.status(401).json({
        message: "Owner Already Exists",
      });
    }
    await newOwner.save();
    res.status(201).json({
      message: "Owner created successfully",
      newOwner,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Get an owner by ID
exports.getOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await ownerSchema.findById(id);

    if (!owner) return res.status(404).json({ message: "Owner not found" });

    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Delete an owner by ID
exports.deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOwner = await ownerSchema.findByIdAndDelete(id);

    if (!deletedOwner)
      return res.status(404).json({ message: "Owner not found" });

    res.status(200).json({
      message: "Owner deleted successfully",
      deletedOwner,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Get all owners
exports.getAllOwners = async (req, res) => {
  try {
    const { page = 1, limit = 3, search = "" } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;

    const total = await ownerSchema.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const listOwner = await ownerSchema
      .find({
        name: { $regex: search, $options: "i" },
      })
      .skip(skip)
      .limit(parsedLimit)
      .exec();
    const totalPages = Math.ceil(total / parsedLimit);
    const currentPage = Math.min(parsedPage, totalPages);
    res.status(200).json({
      success: true,
      messsage: "Owner Fetched Successfully",
      listOwner,
      totalPages,
      currentPage,
      totalCount: total,
    });
    // const owners = await ownerSchema.find();
    // res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};

// Update an owner by ID
exports.updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      contact,
      password,
      email,
      qatarId,
      address,
      state,
      dob,
      preferredLanguage,
      city,
      pinCode,
    } = req.body;

    const updatedOwner = await ownerSchema.findByIdAndUpdate(
      id,
      {
        name,
        contact,
        password,
        email,
        qatarId,
        address,
        state,
        dob,
        preferredLanguage,
        city,
        pinCode,
      },
      { new: true }
    );

    if (!updatedOwner)
      return res.status(404).json({ message: "Owner not found" });

    res.status(200).json({
      message: "Owner updated successfully",
      updatedOwner,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unexpected error occurred",
    });
  }
};
