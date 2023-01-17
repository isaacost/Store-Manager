const salesService = require('../services/sales.service');

const create = async (req, res) => {
  const { type, message } = await salesService.create(req.body);
  if (type && type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ message });
  }

  if (type) return res.status(422).json({ message });

  return res.status(201).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  create,
};