const productService = require('../services/product.service');

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

module.exports = {getProductByCategory};
