const express = require("express");

const router = express.Router();

// ========= API Route Imports =========
const faqApi = require("./faq.api");
const cartApi = require("./cart.api");
const checkoutApi = require("./checkout.api");
const resourceApi = require("./resource.api");

// ========= API Route Mounting =========

// FAQ APIs
router.use("/faq", faqApi);

// Cart APIs
router.use("/cart", cartApi);

// Checkout APIs
router.use("/checkout", checkoutApi);

// Resource APIs
router.use("/resource", resourceApi);



module.exports = router;