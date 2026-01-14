const feedbackService = require("../services/faqFeedback.service");

async function createFaqFeedback(req, res, next) {
  try {
    const { name, email, message, faq_id } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ statusCode: 400, message: "message is required" });
    }

    const created = await feedbackService.createFeedback({
      name: name?.trim(),
      email: email?.trim(),
      message: message.trim(),
      faq_id: faq_id ? Number(faq_id) : undefined,
    });

    return res.status(201).json({ statusCode: 201, data: created });
  } catch (err) {
    next(err);
  }
}

async function getFaqFeedback(req, res, next) {
  try {
    const list = await feedbackService.getAllFeedback();
    return res.status(200).json({ statusCode: 200, data: list });
  } catch (err) {
    next(err);
  }
}

module.exports = { createFaqFeedback, getFaqFeedback };
