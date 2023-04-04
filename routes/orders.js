const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router()


router.post('/createOrder', OrderController.create)
module.exports = router;