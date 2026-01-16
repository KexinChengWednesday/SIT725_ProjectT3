const express = require("express");

const router = express.Router();

// ========= Route Imports =========
const pageRoutes = require("./pages.routes");
const apiRoutes = require("./api");

// ========= Route Mounting =========

// Page routes (/, /faq, /products, /blog, etc.)
router.use("/", pageRoutes);

// API routes (/api/faq/*, /api/products/*, /api/blog/*)
router.use("/api", apiRoutes);

// homepage render//


module.exports = router;