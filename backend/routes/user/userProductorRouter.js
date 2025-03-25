const express = require('express');
const { addToCart, removeCartItems, updateCartItems, getUserCart, orderplaced,orders } = require('../../controllers/user/userProductController');
const router = express.Router();

router.post('/addToCart',addToCart);
router.post('/removeCartItems',removeCartItems);
router.post('/updateCartItems',updateCartItems);
router.post('/getUserCart',getUserCart);
router.post('/orderplaced',orderplaced);
router.get('/orders',orders);


module.exports = router;
