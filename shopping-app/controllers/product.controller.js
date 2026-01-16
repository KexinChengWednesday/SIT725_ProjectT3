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

async function getProductByCategory(req, res, next) {
  try {
    const { category } = req.params;
    console.log(category);
    const products = await productService.getProductByCategory(category);
    res.status(200).json({ statusCode: 200, data: products });
  } catch (err) {
    next(err);
  }
}

module.exports = {getProductByCategory, list, getById};