const express = require("express");

const router = express.Router();

// ========= Route Imports =========
const pageRoutes = require("./pages.routes");
const apiRoutes = require("./api");
const cartApi = require("./api/cart.api");


// ========= Route Mounting =========

// Page routes (/, /faq, /products, /blog, etc.)
router.use("/", pageRoutes);

// API routes (/api/faq/*, /api/products/*, /api/blog/*)
router.use("/api", apiRoutes);

module.exports = router;