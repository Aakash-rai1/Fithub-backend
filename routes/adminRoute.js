const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const auth = require('../middleware/auth')


router.post("/adminlogin", userController.login)
router.get("/admincheckLogin",auth,userController.checklogin)
router.post("/createAdmin",userController.addUser)
router.get("/findAdmin",userController.findUser)
router.get("/findAdminById/:_id",userController.findUserById)
router.delete("/deleteAdmin/:_id",userController.deleteUserById)
router.put("/updateAdmin/:_id",auth,userController.updateUser)
router.get("/getAdminbyemail/:email",userController.checkemail)
router.delete("/logoutAdmin",auth,userController.logout)
module.exports = router