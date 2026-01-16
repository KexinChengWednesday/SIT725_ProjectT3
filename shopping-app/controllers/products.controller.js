// controllers/products.controller.js
const productService = require("../services/product.service");

async function list(req, res, next) {
  try {
    const products = await productService.listProducts({ onlyActive: true });
    return res.json(products);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductByProductId(id, { onlyActive: true });
    return res.json(product);
  } catch (err) {
    return next(err);
  }
}

module.exports = { list, getById };
