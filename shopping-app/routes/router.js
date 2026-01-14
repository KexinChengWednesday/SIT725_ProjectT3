const express = require("express");
const path = require("path");

const router = express.Router();

// ========= Controllers =========
const faqController = require("../controllers/faq.controller");
const faqFeedbackController = require("../controllers/faqFeedback.controller");

// ========= Pages =========

// FAQ page
router.get("/faq", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "faq.html"));
});

// Homepage
router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "homepage.html"));
});

// ========= APIs =========

// FAQs list
router.get("/api/faqs", faqController.getFaqs);

// FAQ feedback (MongoDB)
router.post("/api/faq-feedback", faqFeedbackController.createFaqFeedback);
router.get("/api/faq-feedback", faqFeedbackController.getFaqFeedback);

module.exports = router;
