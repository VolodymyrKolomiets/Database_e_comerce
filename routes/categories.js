const express = require('express');
const CategoryController = require('../controllers/CategoryControllers');
const { isAdmin, authentication } = require('../middlewares/authentication');
const router = express.Router();
const { typeError } = require('../middlewares/errors');


router.post('/createCategory', isAdmin, typeError, CategoryController.create)
router.put('/updateCategory/:id', isAdmin, typeError, CategoryController.updateCategory)
router.delete('/deleteCategory/:id', isAdmin, authentication, typeError, CategoryController.deleteCategory)
router.get('/findAllCategories', authentication, typeError, CategoryController.getAllCategories)
router.get('/findAllCategoriesWithProducts', authentication, typeError, CategoryController.getAllCategoryWithProducts)
router.get('/findCategory/:id',isAdmin, authentication, typeError, CategoryController.getCategoryById)
router.get('/findByCategory/:category', authentication, typeError, CategoryController.searchByCategory)
module.exports = router;