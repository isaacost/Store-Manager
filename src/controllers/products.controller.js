const productsService = require('../services/products.service');

const findAll = async (_req, res) => {
  const products = await productsService.findAll();
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  console.log(product);

  if (product.length === 0 || product.type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product[0]);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.create(name);
  if (type) return res.status(422).json({ message });
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update(id, name);
  if (type) return res.status(422).json({ message });
  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.remove(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};