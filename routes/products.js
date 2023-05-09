const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication, isAdmin } = require('../middlewares/authentication');
const router = express.Router()


router.post('/createProduct', ProductController.create) // authentication, isAdmin,
router.put('/updateProduct/:id', ProductController.update) // authentication, isAdmin,
router.delete('/deleteProduct/:id', ProductController.delete) // authentication, isAdmin,
router.get('/findProductById/:id', authentication, isAdmin, ProductController.getById)
router.get('/getAll', ProductController.getAll)
router.get('/findProductByName/:name', ProductController.searchByName)
router.get('/findProductByPrice/:price', ProductController.filterByPrice)
router.get('/sortProductByPrice', ProductController.sortByPrice)
module.exports = router;