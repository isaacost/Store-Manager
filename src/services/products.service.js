const { productsModel } = require('../models');
const validationsInput = require('./validations/validationsInput');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (id) => {
  const error = validationsInput.validateId(id);
  if (error.type) return error;

  const products = await productsModel.findById(id);
  if (products) return products;

  return { type: '', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};