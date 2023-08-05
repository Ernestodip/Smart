const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart/add', cartController.addToCart);
router.delete('/cart/remove/:productId', cartController.removeFromCart);

module.exports = router;
