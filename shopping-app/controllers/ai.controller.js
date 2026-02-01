const aiService = require('../services/ai.service');

exports.renderAiPage = (req, res) => {
  res.render('ai', { title: 'AI Assistant - GoPick' });
};

exports.recommend = async (req, res, next) => {
  try {
    const { budget, style, keywords } = req.body;

    const result = await aiService.getRecommendations({
      budget,
      style,
      keywords,
    });

    res.status(200).json({ statusCode: 200, data: result });
  } catch (err) {
    next(err);
  }
};
