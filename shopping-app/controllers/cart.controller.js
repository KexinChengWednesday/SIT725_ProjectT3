// controllers/cart.controller.js
const cartService = require("../services/cart.service");


function getSessionUserId(req) {
  const id = req.session?.user?.id;
  if (!id) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
  return id; // Mongo ObjectId string
}

exports.getCart = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const userId = getSessionUserId(req);
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};

exports.addItem = async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productId, quantity } = req.body;
    const cart = await cartService.addItem(userId, productId, quantity ?? 1);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productId, quantity } = req.body;
    const cart = await cartService.updateQuantity(userId, productId, quantity);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = getSessionUserId(req);
    const { productId } = req.params;
    const cart = await cartService.removeItem(userId, productId);
    res.json(cart);
  } catch (e) {
    res.status(e.status || 500).send(e.message || "Server error");
  }
};
