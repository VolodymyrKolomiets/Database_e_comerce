const express = require('express');
const CategoryController = require('../controllers/CategoryControllers');
const router = express.Router()


router.post('/createCategory', CategoryController.create)
module.exports = router;