const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router()
const {  authentication } = require('../middlewares/authentication');



router.post('/createOrder', authentication, OrderController.create)
router.get('/findAllOrdersWithProducts', authentication, OrderController.getAllOrdersWithProducts)
module.exports = router;