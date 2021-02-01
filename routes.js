const { Router } = require('express');

const productController = require('./controllers/productController');
const accessoryController = require('./controllers/accessoryController');

const router = Router();


router.use('/', productController);
router.use('/accessories', accessoryController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;