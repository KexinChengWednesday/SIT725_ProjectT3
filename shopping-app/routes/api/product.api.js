// routes/api/product.api.js
const express = require("express");
const router = express.Router();

const productsApi = require("../../controllers/product.controller");
const reviewsApi = require("../../controllers/reviews.controller");

// ========= Product APIs =========
router.get("/byCategory/:category", productsApi.getProductByCategory);

// GET /api/products
router.get("/", productsApi.list);

// GET /api/products/:id
router.get("/:id", productsApi.getById);

// GET /api/products/:id/reviews
router.get("/:id/reviews", reviewsApi.listByProduct);

module.exports = router;