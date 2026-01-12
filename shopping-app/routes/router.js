const express = require('express');
const path = require('path');

const router = express.Router();

// faq
router.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'faq.html'));
});

// homepage.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'homepage.html'));
});

// ========= APIs =========
const faqController = require('../controllers/faq.controller');


router.get('/api/faqs', faqController.getFaqs);

module.exports = router;
