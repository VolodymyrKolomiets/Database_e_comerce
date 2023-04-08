const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router()


router.post('/createOrder', OrderController.create)
router.get('/findAllOrdersWithProducts', OrderController.getAllOrdersWithProducts)
module.exports = router;