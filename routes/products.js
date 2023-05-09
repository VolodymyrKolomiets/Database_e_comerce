const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middlewares/authentication');
const router = express.Router()


router.post('/createProduct', authentication, isAdmin, ProductController.create)
router.put('/updateProduct/:id', authentication, isAdmin , ProductController.update)
router.delete('/deleteProduct/:id', authentication, isAdmin, ProductController.delete)
router.get('/findProductById/:id', authentication, isAdmin, ProductController.getById)
router.get('/getAll', authentication, isAdmin, ProductController.getAll)
router.get('/findProductByName/:name', authentication, ProductController.searchByName)
router.get('/findProductByPrice/:price', authentication, ProductController.filterByPrice)
router.get('/sortProductByPrice', authentication, ProductController.sortByPrice)
module.exports = router;