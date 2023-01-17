const { Router } = require('express');
const productsRoutes = require('./productsRoutes');
const salesRoutes = require('./salesRoutes');

const router = Router();

router.use('/products', productsRoutes);
router.use('/sales', salesRoutes);

module.exports = router;