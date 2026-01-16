// services/review.service.js
const Review = require("../models/review.model");
const HttpError = require("../utils/httpError");

async function listReviewsByProductId(productId) {
  if (!Number.isFinite(productId) || productId <= 0) {
    throw new HttpError(400, "Invalid product id");
  }

  const rows = await Review.find({ product_id: productId }).lean();
  return rows;
}

module.exports = {
  listReviewsByProductId,
};