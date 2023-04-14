const express = require('express')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()
const { typeError } = require('../middlewares/errors')

router.post('/createUser', typeError, UserController.create)
router.post("/login", typeError, UserController.login)
router.get("/findUserByIdWithOrdersProducts/:id", typeError, UserController.getUserByIdWithOrderProduct)
router.delete("/logout/:id", authentication, typeError, UserController.logout)
router.get("/confirm/:emailToken,", typeError, UserController.confirm)

module.exports = router;