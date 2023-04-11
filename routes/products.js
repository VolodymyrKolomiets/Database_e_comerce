const express = require('express');
const ProductController = require('../controllers/ProductController');
const { authentication } = require('../middlewares/authentication');
const router = express.Router()


router.post('/createProduct', authentication, ProductController.create)
router.put('/updateProduct/:id', authentication, ProductController.update)
router.delete('/deleteProduct/:id', authentication, ProductController.delete)
router.get('/findProductById/:id', ProductController.getById)
router.get('/getAll', ProductController.getAll)
router.get('/findProductByName/:name', ProductController.searchByName)
router.get('/findProductByPrice/:price', ProductController.filterByPrice)
router.get('/sortProductByPrice', ProductController.sortByPrice)
module.exports = router;