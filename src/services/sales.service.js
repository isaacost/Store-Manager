const { salesModel, productsModel } = require('../models');
const validationsInput = require('./validations/validationsInput');

const create = async (body) => {
  const { type, message } = validationsInput.validateCreateSale(body);
  if (type) return { type, message };

  const isAllInDb = await Promise.all(
    body.map(async (e) => {
      const product = await productsModel.findById(e.productId);
      if (!product) return 'no';
      return 'yes';
    }),
  );

  if (isAllInDb.some((e) => e === 'no')) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const result = await salesModel.create(body);

  if (result.type) return result;

  return { type: null, message: result.message };
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = {
  findAll,
  findById,
  create,
};