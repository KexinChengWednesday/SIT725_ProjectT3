const Banner = require('../models/banner.model');
const { productCategoryModel, faqsCategoryModel } = require('../models/category.model')
async function getBanner() {
  try {
    const banners = await Banner.find();
    return banners;
  } catch (error) {
    throw error;
  }
}

async function getProductCategory() {
  try {
    const category = await productCategoryModel.find();
    return category;
  } catch (error) {
    throw error;
  }
}

module.exports = { getBanner, getProductCategory };
