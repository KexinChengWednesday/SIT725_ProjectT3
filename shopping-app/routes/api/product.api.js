// routes/api/product.api.js
const express = require("express");
const router = express.Router();

const productsApi = require("../../controllers/product.controller");
const reviewsApi = require("../../controllers/reviews.controller");

// GET /api/products
router.get("/", productsApi.list);

// GET /api/products/:id
router.get("/:id", productsApi.getById);

// GET /api/products/:id/reviews
router.get("/:id/reviews", reviewsApi.listByProduct);

// ========= Product APIs =========
router.get("/:category", productsApi.getProductByCategory);

module.exports = router;