// shopping-app/middleware/adminAuth.js
module.exports = function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_KEY;

  // support two ways：Header or query
  const provided =
    req.headers["x-admin-key"] ||
    req.query.key;

  if (!expected) {
    return res.status(500).send("ADMIN_KEY is not configured");
  }

  if (provided !== expected) {
    return res.status(401).send("Unauthorized: invalid admin key");
  }

  next();
};
