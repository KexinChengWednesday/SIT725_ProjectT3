const express = require("express");
const router = express.Router();

// ========= Controllers =========
const productController = require("../../controllers/product.controller");

// ========= Product APIs =========
router.get("/:category", productController.getProductByCategory);

module.exports = router;