const express = require('express');
const CategoryController = require('../controllers/CategoryControllers');
const { isAdmin, authentication } = require('../middlewares/authentication');
const router = express.Router();


router.post('/createCategory', isAdmin, CategoryController.create)
router.put('/updateCategory/:id', isAdmin, CategoryController.updateCategory)
router.delete('/deleteCategory/:id', isAdmin, authentication, CategoryController.deleteCategory)
router.get('/findAllCategories', authentication, CategoryController.getAllCategories)
router.get('/findAllCategoriesWithProducts', authentication, CategoryController.getAllCategoryWithProducts)
router.get('/findCategory/:id',isAdmin, authentication, CategoryController.getCategoryById)
router.get('/findByCategory/:category', authentication, CategoryController.searchByCategory)
module.exports = router;