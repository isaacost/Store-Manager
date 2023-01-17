const { Router } = require('express');
const { create } = require('../controllers/sales.controller');
const { validateFields } = require('../middlewares/saleMiddleware');

const router = Router();

router.post('/', validateFields, create);

// router.get('/', saleController.getAll);

// router.get('/:id', saleController.getById);

// router.delete('/:id', saleController.remove);

// router.put('/:id', mid.validateFields, saleController.update);

module.exports = router;