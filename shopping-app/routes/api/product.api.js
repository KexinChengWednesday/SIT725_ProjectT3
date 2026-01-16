// routes/mockApiRouter.js
const express = require("express");
const router = express.Router();

const productsApi = require("../controllers/products.api.controller");
const reviewsApi = require("../controllers/reviews.api.controller");

// GET /api/products
router.get("/products", productsApi.list);

// GET /api/products/:id
router.get("/products/:id", productsApi.getById);

// GET /api/products/:id/reviews
router.get("/products/:id/reviews", reviewsApi.listByProduct);

module.exports = router;