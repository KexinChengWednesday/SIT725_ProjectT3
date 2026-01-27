const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// Page
router.get('/ai', aiController.renderAiPage);

// API
router.post('/api/ai/recommend', express.json(), aiController.recommend);

module.exports = router;
