const Faq = require('../models/faq.model');

async function getFaqs({ keyword, category }) {
  const filter = {};

  if (category) filter.category = category;

  if (keyword) {
    filter.$or = [
      { question: { $regex: keyword, $options: 'i' } },
      { answer: { $regex: keyword, $options: 'i' } },
    ];
  }


  return await Faq.find(filter).sort({ createdAt: -1 });
}

module.exports = { getFaqs };
