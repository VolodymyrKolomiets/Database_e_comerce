const express = require('express');
const OrderController = require('../controllers/OrderController');
const router = express.Router()
const {  authentication } = require('../middlewares/authentication');
const { typeError } = require('../middlewares/errors')



router.post('/createOrder', authentication, typeError, OrderController.create)
router.get('/findAllOrdersWithProducts', authentication, typeError, OrderController.getAllOrdersWithProducts)
module.exports = router;