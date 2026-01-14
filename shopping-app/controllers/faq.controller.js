const faqService = require('../services/faq.service');

async function getFaqs(req, res, next) {
  try {
    const { keyword, category } = req.query;
    const faqs = await faqService.getFaqs({ keyword, category });
    res.status(200).json({ statusCode: 200, data: faqs });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFaqs };
