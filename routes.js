const { Router } = require("express");

const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');

const productController = require("./controllers/productController");
const accessoryController = require("./controllers/accessoryController");
const authController = require("./controllers/authController");

const router = Router();

router.use("/", productController);
router.use('/auth', authController);
router.use("/accessories", accessoryController);
router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
