const Product = require('../models/product.model');

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

module.exports = { getProductByCategory };
