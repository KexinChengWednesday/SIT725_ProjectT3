const express = require("express");
const router = express.Router();

// ========= Pages =========

// FAQ page
router.get("/faq", (req, res) => {
  res.render("faq");
});

// Homepage
router.get("/homepage", async (req, res) => {
  try {
    // Fetch categories from API
    const response = await fetch('http://localhost:5000/api/resource/product-category');
    
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`);
    }

    const categories = await response.json();

    // Pass categories to homepage.ejs
    res.render("homepage", { 
      title: "Home",
      categories: categories 
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Render with empty categories if API fails
    res.render("homepage", { 
      title: "Home",
      categories: [] 
    });
  }
});

// Cart page
router.get("/cart", (req, res) => {
  res.render("cart");
});

// Checkout page
router.get("/checkout", (req, res) => {
  res.render("checkout");
});

// Confirmation page
router.get("/confirmation", (req, res) => {
  res.render("confirmation");
});

// product detail page
router.get("/product", (req, res) => res.render("product"));
router.get("/product/:id", (req, res) => res.render("product"));

module.exports = router;