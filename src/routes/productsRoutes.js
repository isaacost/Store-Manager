const { Router } = require('express');
const products = require('../controllers/products.controller');
const { validateProductName } = require('../middlewares/validateProductName');

const router = Router();

router.get('/', products.findAll);

router.get('/:id', products.findById);

router.post('/', validateProductName, products.create);

router.put('/:id', validateProductName, products.update);

router.delete('/:id', products.remove);

module.exports = router;