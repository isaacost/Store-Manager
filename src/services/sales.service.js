const { salesModel, productsModel } = require('../models');
const validationsInput = require('./validations/validationsInput');

// const findAll = async () => {
//   const sales = await salesModel.findAll();
//   return sales;
// };

// const findById = async (id) => {
//   const error = validationsInput.validateIdSales(id);
//   if (error.type) return error;

//   const sales = await salesModel.findById(id);
//   if (sales) return sales;

//   return { type: '', message: 'Sale not found' };
// };

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

module.exports = {
  // findAll,
  // findById,
  create,
};