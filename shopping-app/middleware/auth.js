function requireUser(req, res, next) {
  if (req.session?.user) {
    return next(); // User is logged in
  }
  res.redirect("/login");
}

function requireAdmin(req, res, next) {
  if (req.session?.user?.role === "admin") {
    return next(); // User is admin
  }
  
  // User not logged in or not admin
  if (!req.session?.user) {
    // Not logged in
    return res.redirect("/login")
  }
  
  // Logged in but not admin
  return res.status(403).json({ 
    message: 'Unauthorized - Admin access required'
  });
}

function checkAuth(req, res, next) {
  if (req.session.user && req.session.user.role ==="admin") {
    return res.redirect("/admin/dashboard");
  }
  if (req.session.user && req.session.user.role ==="user") {
    return res.redirect("/homepage");
  }
  next();
};

module.exports = {
  requireUser,
  requireAdmin,
  checkAuth
};
