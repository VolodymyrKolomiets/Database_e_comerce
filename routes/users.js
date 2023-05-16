const express = require('express')
const UserController = require('../controllers/UserController')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/createUser',  UserController.create)
router.post("/login",  UserController.login)
router.get("/getUserInfoById", authentication, UserController.getUserInfoById)
router.delete("/logout", authentication,  UserController.logout)
router.get("/confirm/:emailToken" , UserController.confirm)

module.exports = router;