const express = require('express');
const { loginSeller, signupSeller, logoutSeller, resetPassword } = require('../../controllers/seller/sellerController');

const router = express.Router();

router.post('/login',loginSeller)
router.post('/signup',signupSeller)
router.get('/logout', logoutSeller)
router.post('/reset-password', resetPassword)

module.exports = router;