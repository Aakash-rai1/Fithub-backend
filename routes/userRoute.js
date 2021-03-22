const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const auth = require('../middleware/auth')


router.post("/login", userController.login)
router.get("/checkLogin",auth,userController.checklogin)
router.post("/createUser",userController.addUser)
router.get("/findUser",userController.findUser)
router.get("/findUserById/:_id",userController.findUserById)
router.delete("/deleteUser/:_id",userController.deleteUserById)
router.put("/updateUser/:_id",auth,userController.updateUser)
router.get("/getuserbyemail/:email",userController.checkemail)
router.delete("/logout",auth,userController.logout)
module.exports = router