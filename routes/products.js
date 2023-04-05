const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middelwere/authentication');
const router = express.Router()


router.post('/createProduct', authentication, isAdmin, ProductController.create)
module.exports = router;