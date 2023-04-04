const express = require('express')
const UserController = require('../controllers/UserControler')
const router = express.Router()


router.post('/createUser', UserController.create)
module.exports = router;