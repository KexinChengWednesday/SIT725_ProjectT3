// services/product.service.js
const Product = require("../models/product.model");
const HttpError = require("../utils/httpError");

async function listProducts({ onlyActive = true } = {}) {
  const filter = {};
  if (onlyActive) filter.isActive = true;

  // lean(): return plain objects, faster for read-only APIs
  return Product.find(filter).lean();
}

async function getProductByProductId(productId, { onlyActive = true } = {}) {
  if (!Number.isFinite(productId) || productId <= 0) {
    throw new HttpError(400, "Invalid product id");
  }

  const filter = { product_id: productId };
  if (onlyActive) filter.isActive = true;

  const product = await Product.findOne(filter).lean();
  if (!product) throw new HttpError(404, "Product not found");

  return {
    ...product,
    inStock: Number(product.stock ?? 0) > 0,
  };
}

async function getProductByCategory(category) {
  try {
    // Fetch products from database
    const products = await Product.find({ categoryId: category }).lean();

    // Convert Decimal128 to number and format data
    const processedProducts = products.map(product => ({
      product_id: product._id || product.product_id,
      name: product.name,
      price: parseFloat(product.price),  // Convert Decimal128 to number
      image: product.image,
      categoryId: product.categoryId,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      specifications: product.specifications || [],
      stock: product.stock || 0,
      rating: product.rating || 0,
      sales: product.sales || 0,
      isActive: product.isActive !== false,
    }));

    return processedProducts;
  } catch (error) {
    throw error;
  }
}

module.exports = { getProductByCategory,listProducts,getProductByProductId};
