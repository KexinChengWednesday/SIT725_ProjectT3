const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");
const adminFeedbackController = require("../controllers/adminFeedback.controller");

router.use(adminAuth);

// routes only map URL -> controller function
router.get("/feedbacks", adminFeedbackController.renderFeedbacks);
router.post("/feedbacks/:id/status", adminFeedbackController.updateFeedbackStatus);
router.post("/feedbacks/:id/delete", adminFeedbackController.softDeleteFeedback);

module.exports = router;
