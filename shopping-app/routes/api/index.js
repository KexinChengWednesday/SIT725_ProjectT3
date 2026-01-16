const express = require("express");

const router = express.Router();

// ========= API Route Imports =========
const faqApi = require("./faq.api");
const cartApi = require("./cart.api");
const checkoutApi = require("./checkout.api");
const resourceApi = require("./resource.api");
const productApi = require("./product.api");

// ========= API Route Mounting =========

// FAQ APIs
router.use("/faq", faqApi);

// Product APIs
router.use("/product", productApi);

// Cart APIs
router.use("/cart", cartApi);

// Checkout APIs
router.use("/checkout", checkoutApi);

// Resource APIs
router.use("/resource", resourceApi);

// Product APIs
router.use("/products", productApi);

module.exports = router;