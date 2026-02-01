const express = require("express");
const router = express.Router();

const adminFeedbackController = require("../../controllers/adminFeedback.controller");
const adminUser = require("../../controllers/adminUser.controller");

router.post(
  "/feedbacks/:id/status",
  adminFeedbackController.updateFeedbackStatus,
);
router.post(
  "/feedbacks/:id/delete",
  adminFeedbackController.softDeleteFeedback,
);
router.delete("/user", adminUser.deleteUserByEmail);

module.exports = router;
