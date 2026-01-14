const FaqFeedback = require("../models/faqFeedback.model");

async function createFeedback(payload) {
  return await FaqFeedback.create(payload);
}


async function getAllFeedback() {
  return await FaqFeedback.find({}).sort({ createdAt: -1 }).lean();
}

module.exports = { createFeedback, getAllFeedback };
