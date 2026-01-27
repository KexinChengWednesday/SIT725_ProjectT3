// shopping-app/routes/admin.routes.js
const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const feedbackService = require("../services/faqFeedback.service");

// Admin page (advanced read)
router.get("/feedbacks", adminAuth, async (req, res, next) => {
  try {
    const { status, q, key } = req.query;
    const items = await feedbackService.getAllFeedback({ status, q });

    res.render("admin/feedbacks", {
      items,
      status: status || "",
      q: q || "",
      key: key || "",
    });
  } catch (err) {
    next(err);
  }
});

// Update status
router.post("/feedbacks/:id/status", adminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await feedbackService.updateStatus(id, status);

    const key = encodeURIComponent(req.query.key || "");
    res.redirect(`/admin/feedbacks?key=${key}`);
  } catch (err) {
    next(err);
  }
});

// Soft delete
router.post("/feedbacks/:id/delete", adminAuth, async (req, res, next) => {
  try {
    const { id } = req.params;

    await feedbackService.softDelete(id);

    const key = encodeURIComponent(req.query.key || "");
    res.redirect(`/admin/feedbacks?key=${key}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
