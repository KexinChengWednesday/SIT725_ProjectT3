const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");
const adminFeedbackController = require("../controllers/adminFeedback.controller");

const { requireUser, requireAdmin, checkAuth } = require('../middleware/auth');
// ========= Pages =========

// Default base route will be redirected to homepage
router.get("/", (req, res) => {
  res.redirect("/homepage");
});

// FAQ page
router.get("/faq", (req, res) => {
  res.render("faq", { title: "FAQs", user: req.session?.user || null  });
});

// Login page
router.get("/login", checkAuth, (req, res) => {
  res.render("login");
});

// Homepage
router.get("/homepage", async (req, res) => {
  res.render("homepage", { title: "Home", user: req.session?.user || null });
});

// Profile page 
router.get("/account", requireUser, accountController.renderProfilePage);

// Address page 
router.get("/account/address", requireUser, accountController.renderAddressPage);

// Payment page 
router.get("/account/payment", requireUser, accountController.renderPaymentPage);

// Cart page
router.get("/cart", requireUser, (req, res) => {
  res.render("cart", {user: req.session?.user || null });
});

// Checkout page
router.get("/checkout", requireUser, (req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", requireUser, (req, res) => {
  res.render("confirmation");
});

// product detail page
router.get("/product/:id", (req, res) => res.render("product", {user: req.session?.user || null  }));

// admin pages
router.get("/admin/feedbacks", requireAdmin, adminFeedbackController.renderFeedbacks);
router.get("/admin/dashboard", requireAdmin, (req, res) => res.render("admin/dashboard"));
router.get("/admin/users", requireAdmin, (req, res) => res.render("admin/users"));

// sign up page
router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});
module.exports = router;
