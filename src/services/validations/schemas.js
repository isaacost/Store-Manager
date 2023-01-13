const joi = require('joi');

const idProduct = joi.number().min(1).required();

const idSales = joi.number().min(1).required();

module.exports = {
  idProduct,
  idSales,
};