const express = require('express')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()


router.post('/createUser', UserController.create)
router.post("/login", UserController.login)
router.get("/findUserByIdWithOrdersProducts/:id", UserController.getUserByIdWithOrderProduct)
router.delete("/logout/:id", authentication, UserController.logout)
router.get("/confirm/:emailToken,", UserController.confirm)

module.exports = router;