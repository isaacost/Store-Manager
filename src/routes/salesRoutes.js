const { Router } = require('express');
const { create, findAll, findById } = require('../controllers/sales.controller');
const { validateFields } = require('../middlewares/saleMiddleware');

const router = Router();

router.post('/', validateFields, create);

router.get('/', findAll);

router.get('/:id', findById);

module.exports = router;