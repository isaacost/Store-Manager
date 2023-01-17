const validateSales = (sales) => {
  if (sales.every((e) => e === 'yes')) return true;
};

const validateFields = (req, res, next) => {
  let sales = req.body;
  sales = sales.map(({ productId, quantity }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }

    if (quantity === 0) {
      return res
        .status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    if (!quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    return 'yes';
  });

   return validateSales(sales) && next();
};

module.exports = {
  validateFields,
};