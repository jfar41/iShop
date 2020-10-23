var express = require('express');
var router = express.Router();
var productsCtrl = require('../../controllers/api/products');

router.use(require('../../config/auth'));
/* GET /api/puppies */
router.get('/', checkAuth, productsCtrl.index);
router.get('/:id', checkAuth, productsCtrl.show);
router.post('/', productsCtrl.create);
router.put('/:id', productsCtrl.update);
router.delete('/:id', checkAuth, productsCtrl.delete);

/*--- Helper Functions ---*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
}
module.exports = router;