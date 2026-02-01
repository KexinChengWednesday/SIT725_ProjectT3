const express = require("express");

const router = express.Router();

// ========= API Route Imports =========
const faqApi = require("./faq.api");
const cartApi = require("./cart.api");
const checkoutApi = require("./checkout.api");
const resourceApi = require("./resource.api");
const productApi = require("./product.api");
const authApi = require("./auth/auth.api");
const accountApi = require("./account.api");
const adminApi = require("./admin.api");
const aiController = require('../../controllers/ai.controller');


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

// Account APIs
router.use("/account", accountApi);

//Auth APIs
router.use("/auth", authApi);

//Admin APIs
router.use("/admin", adminApi);

//Session API
router.get("/session", (req, res) => {
  if (req.session.user) {
    return res.json({
      success: true,
      user: req.session.user
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "No user session found"
    });
  }
});

router.post('/ai/recommend', express.json(), aiController.recommend);

module.exports = router;
