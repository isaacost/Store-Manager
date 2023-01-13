const productsService = require('../services/products.service');

const findAll = async (_req, res) => {
  const products = await productsService.findAll();
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
// console.log(product);

  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]);
};

const create = async (req, res) => {
  const { name } = req.body;
  const id = await productsService.create(name);

  return res.status(201).json({ id, name });
};

module.exports = {
  findAll,
  findById,
  create,
};