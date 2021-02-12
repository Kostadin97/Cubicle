const { Router } = require("express");

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const productService = require("../services/productService");
const accessoryService = require("../services/accessoryService");
const validateProduct = require("../middlewares/validateInput");

const router = Router();


router.get('/', (req, res) => {
  productService
    .getAll(req.query)
    .then((products) => {
      res.render('home', { title: 'Browse', products });
    })
    .catch(() => res.status(500).end());
});

router.get('/create', isAuthenticated, (req, res) => {
  res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, validateProduct, (req, res) => {
  productService
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(() => res.status(500).end());
});

router.get('/edit/:productId', async (req, res) => {
  let product = await productService.getOne(req.params.productId);
  let difficultyLevel;

  if (product.difficultyLevel == 1) {
    difficultyLevel = 'Very Easy';
  }else if (product.difficultyLevel == 2) {
    difficultyLevel = 'Easy';
  }else if (product.difficultyLevel == 3) {
    difficultyLevel = 'Medium';
  }else if (product.difficultyLevel == 4) {
    difficultyLevel = 'Intermediate';
  }else if (product.difficultyLevel == 5) {
    difficultyLevel = 'Expert';
  }else if (product.difficultyLevel == 6) {
    difficultyLevel = 'Hardcore';
  }

  res.render('edit', { title: 'Edit', product, difficultyLevel });
});

router.post('/edit/:productId', (req, res) => {
  productService.edit(req.params.productId, req.body)
    .then(() => res.redirect(`/details/${req.params.productId}`))
    .catch(() => res.status(500).end());
});

router.get('/details/:productId', async (req, res) => {
  let product = await productService.getOneWithAccessories(req.params.productId)

  res.render('details', { title: 'Product Details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
  let product = await productService.getOne(req.params.productId);
  let accessories = await accessoryService.getAllWithout(product.accessories);

  res.render('attachAccessory', {product, accessories});
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
  productService.attachAccessory(req.params.productId, req.body.accessory)
    .then(() => {
      res.redirect(`/details/${req.params.productId}`);
    })
    .catch(() => res.status(500).end());
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

module.exports = router;
