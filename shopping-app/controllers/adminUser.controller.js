const userService = require("../services/user.service");

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
module.exports = { deleteUserByEmail};
