var express = require('express');
var router = express.Router();
var productsCtrl = require('../../controllers/api/products');

/* GET /api/puppies */
router.get('/', productsCtrl.index);
router.get('/:id', productsCtrl.show);
router.post('/', checkAuth, productsCtrl.create);
router.put('/:id', productsCtrl.update);
router.delete('/:id', productsCtrl.delete);

/*--- Helper Functions ---*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}
module.exports = router;