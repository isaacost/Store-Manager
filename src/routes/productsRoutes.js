const { Router } = require('express');
const { findAll, findById, create, update } = require('../controllers/products.controller');
const { validateProductName } = require('../middlewares/validateProductName');

const router = Router();

router.get('/', findAll);

router.get('/:id', findById);

router.post('/', validateProductName, create);

router.put('/:id', validateProductName, update);

module.exports = router;