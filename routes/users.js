const express = require('express')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middelwere/authentication')
const router = express.Router()


router.post('/createUser', UserController.create)
router.post("/login", authentication, UserController.login)
router.get("/findUserByIdWithOrdersProducts/:id", UserController.getUserByIdWithOrderProduct)
router.delete("/logout/:id", authentication, UserController.logout)
module.exports = router;