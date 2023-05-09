const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middlewares/authentication');
const { typeError } = require('../middlewares/errors');
const router = express.Router()


router.post('/createProduct', authentication, isAdmin, typeError, ProductController.create)
router.put('/updateProduct/:id', authentication, isAdmin , typeError, ProductController.update)
router.delete('/deleteProduct/:id', authentication, isAdmin, typeError, ProductController.delete)
router.get('/findProductById/:id', authentication, isAdmin, typeError, ProductController.getById)
router.get('/getAll', authentication, isAdmin, typeError, ProductController.getAll)
router.get('/findProductByName/:name', authentication, typeError, ProductController.searchByName)
router.get('/findProductByPrice/:price', authentication, typeError, ProductController.filterByPrice)
router.get('/sortProductByPrice', authentication, typeError, ProductController.sortByPrice)
module.exports = router;