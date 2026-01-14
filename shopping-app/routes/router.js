const express = require("express");
const path = require("path");

const router = express.Router();

// ========= Controllers =========
const faqController = require("../controllers/faq.controller");
const faqFeedbackController = require("../controllers/faqFeedback.controller");

// ✅ NEW: FAQ page router (separate file for FAQ page routes only)
const faqPageRouter = require("./faq.router");
// ✅ NEW: mount it before the old "/faq" route so it takes precedence
router.use("/faq", faqPageRouter);

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
