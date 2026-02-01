const resourceService = require("../services/resource.service");
const userService = require("../services/user.service");

async function getBanner(req, res, next) {
  try {
    const banners = await resourceService.getBanner();
    res.status(200).json({ statusCode: 200, data: banners });
  } catch (err) {
    next(err);
  }
}

async function getProductCategory(req, res, next) {
  try {
    const category = await resourceService.getProductCategory();
    res.status(200).json({ statusCode: 200, data: category });
  } catch (err) {
    next(err);
  }
}

async function getUsersByRole(req, res, next) {
  try {
    // Extract role from query parameter
    const role = req.query.role;

    // Validate role parameter - must be 'user', 'admin', or 'all'
    if (!role) {
      return res.status(400).json({
        statusCode: 400,
        message:
          "Role parameter is required. Must be 'user', 'admin', or 'all'",
        data: null,
      });
    }

    const roleLower = role.toLowerCase();

    // Validate role is one of the allowed values
    if (roleLower !== "user" && roleLower !== "admin" && roleLower !== "all") {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid role. Role must be either 'user', 'admin', or 'all'",
        data: null,
      });
    }

    // Call service function to get users by role
    const users = await userService.getUsersByRole(roleLower);

    // Return success response with data
    return res.status(200).json({
      statusCode: 200,
      message: `Successfully retrieved ${users.length} user(s)${roleLower !== "all" ? ` with role '${roleLower}'` : ""}`,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUserByEmail(req, res) {
  try {
    // Get email from query parameter
    const { email } = req.query;

    // Validate email parameter
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
        error: "MISSING_EMAIL_PARAM",
      });
    }

    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
        error: "INVALID_EMAIL_FORMAT",
      });
    }

    console.log(`Attempting to delete user with email: ${email}`);

    // Call service to delete user
    const result = await userService.deleteUserByEmail(email);

    // Return success response
    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.deletedUser,
    });
  } catch (error) {
    console.error("Delete User Error:", error.message);

    // Handle user not found error
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
        error: "USER_NOT_FOUND",
      });
    }

    // Default error response
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting user",
      error: "INTERNAL_SERVER_ERROR",
    });
  }
}
module.exports = { getBanner, getProductCategory, getUsersByRole };
