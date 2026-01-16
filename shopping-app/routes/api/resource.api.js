const express = require("express");
const router = express.Router();

// ========= Controllers =========
const resourceController = require("../../controllers/resource.controller");

// ========= Cart APIs =========
router.get("/banner", resourceController.getBanner);
router.get("/product-category", resourceController.getProductCategory);


module.exports = router;