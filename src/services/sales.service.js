const { salesModel } = require('../models');
const validationsInput = require('./validations/validationsInput');

const create = async (body) => {
  const { type, message } = validationsInput.validateCreateSale(body);
  if (type) return { type, message };

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