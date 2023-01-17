const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const findProduct = {
  id: 1,
  name: 'Martelo de Thor',
};

const returnGetAll = {
  type: null,
  message: allProducts,
};

const returnGetById = {
  type: null,
  message: findProduct,
};

const errReturnGetByid = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found',
};

const errReturn = { message: errReturnGetByid.message };

module.exports = {
  allProducts,
  findProduct,
  returnGetAll,
  returnGetById,
  errReturnGetByid,
  errReturn
};