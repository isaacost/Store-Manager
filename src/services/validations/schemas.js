const joi = require('joi');

const idProduct = joi.number().min(1).required();

const idSales = joi.number().min(1).required();

const itemsArray = joi.object({
  productId: joi.number().integer().min(1),
  quantity: joi.number().integer().min(1),
});

module.exports = {
  idProduct,
  idSales,
  itemsArray,
};