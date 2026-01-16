const resourceService = require('../services/resource.service');

async function getBanner(req, res, next) {
  try {
    const banners = await resourceService.getBanner();
    res.status(200).json({ statusCode: 200, data: banners });
  } catch (err) {
    next(err);
  }
}

async function getProductCategory(req, res, next) {
  try {
    const category = await resourceService.getProductCategory();
    res.status(200).json({ statusCode: 200, data: category });
  } catch (err) {
    next(err);
  }
}
module.exports = { getBanner, getProductCategory };
