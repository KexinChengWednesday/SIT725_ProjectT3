const feedbackService = require("../services/faqFeedback.service");

// GET /admin/feedbacks
async function renderFeedbacks(req, res, next) {
  try {
    const { status = "", q = "", key = "" } = req.query;
    const items = await feedbackService.getAllFeedback({ status, q });

    res.render("admin/feedbacks", {
      items,
      status,
      q,
      key,
    });
  } catch (err) {
    next(err);
  }
}

// POST /admin/feedbacks/:id/status
async function updateFeedbackStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await feedbackService.updateStatus(id, status);

    const key = encodeURIComponent(req.query.key || "");
    res.redirect(`/admin/feedbacks?key=${key}`);
  } catch (err) {
    next(err);
  }
}

// POST /admin/feedbacks/:id/delete
async function softDeleteFeedback(req, res, next) {
  try {
    const { id } = req.params;

    await feedbackService.softDelete(id);

    const key = encodeURIComponent(req.query.key || "");
    res.redirect(`/admin/feedbacks?key=${key}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  renderFeedbacks,
  updateFeedbackStatus,
  softDeleteFeedback,
};
