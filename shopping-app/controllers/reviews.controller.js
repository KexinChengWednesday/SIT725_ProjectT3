// controllers/reviews.api.controller.js
const reviewService = require("../services/review.service");

async function listByProduct(req, res, next) {
  try {
    const id = Number(req.params.id);
    const rows = await reviewService.listReviewsByProductId(id);
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listByProduct };