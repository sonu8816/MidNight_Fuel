const express = require('express');
const { getUser, getSeller, verifySeller, rejectSeller,  } = require('../../controllers/admin/headQuarter');
const { adminAuthenticate } = require('../../middleware/adminMiddleware');


const router = express.Router();

router.post('/get-users', adminAuthenticate, getUser)
router.post('/get-sellers',adminAuthenticate, getSeller)
router.post('/verify-seller/:sellerId',adminAuthenticate, verifySeller)
router.post('/reject-seller/:sellerId',adminAuthenticate, rejectSeller)


module.exports = router