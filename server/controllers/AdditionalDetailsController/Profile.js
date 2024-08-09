const additionalDetailSchema = require("../../models/Users/additionalDetailSchema");
const userSchema = require("../../models/Users/userSchema");
//Controller of Onboarding Form
exports.updateDetails = async (req, res) => {
  try {
    const {
      dateOfBirth = "",
      address = "",
      qatarId = "",
      preferredLanguage = "",
      pinCode = "",
    } = req.body;
    const id = req.user.id;
    const userDetails = await userSchema.findById(id);
    const profile = await additionalDetailSchema.findById(
      userDetails.additionalDetails
    );
    profile.dateOfBirth = dateOfBirth;
    profile.address = address;
    profile.qatarId = qatarId;
    profile.preferredLanguage = preferredLanguage;
    profile.pinCode = pinCode;
    await profile.save();
    return res.json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await userSchema
      .findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteAccount = async (req, res) => {
  try {
  } catch (error) {}
};
