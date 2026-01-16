// controllers/cart.controller.js
const cartService = require("../services/cart.service");

exports.getCart = (req, res) => {
  const cart = cartService.getCart();
  res.json(cart);
};

exports.addItem = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = cartService.addItem(productId, quantity ?? 1);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};

exports.updateQuantity = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = cartService.updateQuantity(productId, quantity);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};

exports.removeItem = (req, res) => {
  try {
    const { productId } = req.params;
    const cart = cartService.removeItem(productId);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};
