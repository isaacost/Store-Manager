const { salesModel } = require('../models');
const validationsInput = require('./validations/validationsInput');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async (id) => {
  const error = validationsInput.validateIdSales(id);
  if (error.type) return error;

  const sales = await salesModel.findById(id);
  if (sales) return sales;

  return { type: '', message: 'Sale not found' };
};

module.exports = {
  findAll,
  findById,
};