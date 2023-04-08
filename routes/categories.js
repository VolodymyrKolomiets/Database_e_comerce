const express = require('express');
const CategoryController = require('../controllers/CategoryControllers');
const router = express.Router()


router.post('/createCategory', CategoryController.create)
router.put('/updateCategory/:id', CategoryController.updateCategory)
router.delete('/deleteCategory/:id', CategoryController.deleteCategory)
router.get('/findAllCategories', CategoryController.getAllCategories)
router.get('/findAllCategoriesWithProducts', CategoryController.getAllCategoryWithProducts)
router.get('/findCategory/:id', CategoryController.getCategoryById)
router.get('/findByCategory/:category', CategoryController.searchByCategory)
module.exports = router;