const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");

// ========= Pages =========

// Default base route will be redirected to homepage
router.get("/", (req, res) => {
  res.redirect("/homepage");
});

// FAQ page
router.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQs" });
});

// Homepage
router.get("/homepage", async (req, res) => {
  res.render("homepage", { title: "Home" });
});

// ================== ACCOUNT (Profile / Address / Payment) ==================

// Profile page (GET)
router.get("/account", accountController.renderProfilePage);

// Update profile (POST)  ✅ (matches your form action="/account/update")
router.post("/account/update", accountController.updateProfile);

// Address page (GET)
router.get("/account/address", accountController.renderAddressPage);

// Payment page (GET)
router.get("/account/payment", accountController.renderPaymentPage);

// Delete account (POST)
router.post("/account/delete", accountController.deleteAccount);

// ================== OTHER PAGES ==================

// Cart page
router.get("/cart", (req, res) => {
  res.render("cart");
});

// Checkout page
router.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

// Product detail page
router.get("/product/:id", (req, res) => res.render("product"));

module.exports = router;
