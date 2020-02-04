const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.get_products);

router.get('/:id', productController.get_one_product);

router.post('/', productController.post_product);

module.exports = router;