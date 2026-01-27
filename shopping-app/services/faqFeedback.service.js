// shopping-app/services/faqFeedback.service.js
const FaqFeedback = require("../models/faqFeedback.model");

async function createFeedback(payload) {
  return await FaqFeedback.create(payload);
}

// Advanced read: filter + search + hide deleted
async function getAllFeedback({ status, q } = {}) {
  const filter = { isDeleted: { $ne: true } };

  if (status) filter.status = status;

  if (q) {
    filter.$or = [
      { message: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { name: { $regex: q, $options: "i" } },
    ];
  }

  return await FaqFeedback.find(filter).sort({ createdAt: -1 }).lean();
}

async function updateStatus(id, status) {
  return await FaqFeedback.findByIdAndUpdate(id, { status }, { new: true }).lean();
}

async function softDelete(id) {
  return await FaqFeedback.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean();
}

module.exports = { createFeedback, getAllFeedback, updateStatus, softDelete };
