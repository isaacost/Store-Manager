const joi = require('joi');

const idProduct = joi.number().min(1).required();

const idSales = joi.number().min(1).required();

const itemsArray = joi.object({
  productId: joi.number().integer().min(1),
  quantity: joi.number().integer().min(1),
});

const nameProductSchema = joi.string().min(5).max(30).required();

module.exports = {
  idProduct,
  idSales,
  itemsArray,
  nameProductSchema,
};