const salesService = require('../services/sales.service');

// const findAll = async (_req, res) => {
//   const sales = await salesService.findAll();
//   res.status(200).json(sales);
// };

// const findById = async (req, res) => {
//   const { id } = req.params;
//   const sale = await salesService.findById(id);

//   if (sale.length === 0) {
//     return res.status(404).json({ message: 'Sale not found' });
//   }
//   return res.status(200).json(sale[0]);
// };

const create = async (req, res) => {
  const { type, message } = await salesService.create(req.body);
  if (type && type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json({ message });
  }

  if (type) return res.status(422).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  // findAll,
  // findById,
  create,
};