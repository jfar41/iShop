var express = require('express');
var router = express.Router();
var productsCtrl = require('../../controllers/api/products');

/* GET /api/puppies */
router.get('/', productsCtrl.index);
router.get('/:id', productsCtrl.show);
router.post('/', productsCtrl.create);

module.exports = router;