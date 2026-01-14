const express = require("express");

const router = express.Router();

// FAQ page (EJS)
router.get("/", (_req, res) => {
  // GET /faq
  res.render("faq");
});

module.exports = router;
