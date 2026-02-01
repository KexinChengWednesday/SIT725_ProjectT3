const userService = require("../services/user.service");

async function verifyLogin(req, res) {
  try {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password }); // Log input

    const user = await userService.findUserByEmail(username);
    console.log("User found:", user); // Log user from database

    // Check if user exists
    if (!user) {
      console.log("User not found for email:", username);
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Compare password directly
    if (user.password !== password) {
      console.log("Password mismatch for user:", username);
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Login successful - set user in session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      card: user.cardInfo,
    };

    console.log("Login successful. Session user:", req.session.user); // Log session
    if (user.role === "admin") {
      return res.status(200).json({
        message: "Login successful",
        role: "admin",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      role: "user",
    });

  } catch (err) {
    console.error("Login error:", err); // Log error
    return res.status(500).json({
      message: "Server error: " + err.message,
    });
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({
        message: "Error logging out",
      });
    }

    console.log("User logged out successfully");
    return res.status(200).json({
      message: "Logout successful",
      redirect: "/",
    });
  });
}

module.exports = { verifyLogin, logout };
