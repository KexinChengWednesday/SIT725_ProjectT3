// routes/api/product.api.js
const express = require("express");
const router = express.Router();

console.log("resolved controller path:", require.resolve("../../controllers/products.controller"));
const productsApi = require("../../controllers/products.controller");
const reviewsApi = require("../../controllers/reviews.controller");

// GET /api/products
router.get("/", productsApi.list);

// GET /api/products/:id
router.get("/:id", productsApi.getById);

// GET /api/products/:id/reviews
router.get("/:id/reviews", reviewsApi.listByProduct);

module.exports = router;