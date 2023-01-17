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

const create = async (name) => {
  const product = await productsModel.create(name);
  return product;
};

const update = async (id, name) => {
  const errorId = validationsInput.validateId(id);
  if (errorId.type) return errorId;
  const isAValidId = await productsModel.findById(id);
  if (!isAValidId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const errorName = validationsInput.validateNameProduct(name);
  if (errorName.type) return errorName;
  const updatedProduct = await productsModel.update(id, name);
  if (updatedProduct !== 1) {
    return { type: 'FAIL_UPDATE', message: 'Product not found' };
  }
  return { type: null, message: { id, name } };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};