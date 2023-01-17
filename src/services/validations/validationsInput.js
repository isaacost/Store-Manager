const schemas = require('./schemas');

const validateId = (id) => {
  const { error } = schemas.idProduct.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateIdSales = (id) => {
  const { error } = schemas.idSales.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateCreateSale = (body) => {
  let msgError = '';
  body.map((e) => {
    const { error } = schemas.itemsArray.validate(e);
    if (error && !msgError) msgError = error.message;
    return e;
  });

  if (msgError) return { type: 'INVALID_VALUE', message: msgError };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateIdSales,
  validateCreateSale,
};