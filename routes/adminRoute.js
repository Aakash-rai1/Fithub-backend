const express = require('express'); //third party
const admin = require('../models/adminModel');
const router = express.Router();

const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator');
const { request } = require('http');
const { resolveSoa } = require('dns');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')


router.post('/admin/add',
[
    check('email', "Invalid Email Address ").isEmail(),
    check('fname', "You must enter fname").not().isEmpty()

],
 function(req, res){
    const  errors = validationResult(req);
    console.log(errors.array())

    //is empty
    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
    }
    else{

        const fname = req.body.fname
        const lname = req.body.lname
        const email = req.body.email
        const password = req.body.password




        bcrypt.hash(password,10, function(err, hash){
            console.log(hash)
            const me = new admin({fname : fname, lname : lname, email:email, password:hash});
            me.save()
            .then(function(result){
                // success insert
                res.status(201).json({success: true,
                    message : "Admin Registered success"});
                    console.log('Admin Registered')

            })
            .catch(function(err){
                res.status(500).json({success: false,
                    message : err})
            });
            
        })

    }

})

router.post('/admin/login', async function (req, res) {
  try{
    const email = req.body.email
    const password = req.body.password
    const Users = await admin.checkCrediantialsDb(email,
      password)
  const token = await Users.generateAuthToken()
      res.status(200).json({
        success: true,
        message: "admin login success",
        token: token,
        id: Users._id
      })
    }
    catch(e){
      res.status(200).json({
        success:false,
        message:"invalid credential"
      })
    }
  })


  router.get('/checkAdmin',auth.verifyAdmin, async function(req,res) {
    // res.send(req.data)
   
        res.send(req.user)
    
    
   
  })


  //single display
router.get('/admin/single/:id', function(req,res){
  const id = req.params.id;  
  admin.findOne({_id : id })
  .then(function(data){
      res.status(200).json(data);
  })

  .catch(function(e){
      res.status(500).json({message:e})
  })
})



router.get('/admin/display', function (req, res) {

  admin.find().then(function (data) {
    res.send(data)

  })
})


//update
router.put('/admin/update/:id',(req,res)=>{
  const id=req.body.id
  const fname=req.body.fname
  const lname=req.body.lname

  admin.updateOne({_id:id},{fname:fname,lname:lname}).then(function(){
      res.status(200).json({success:true,msg:"Admin Succesfully Updated"})
  }).catch(function(e){
      res.status(500).json({success:false})
  })
})


//delete
router.delete('/admin/delete/:id', function (req, res) {
  console.log(req.body, req.params.id)

  admin.deleteOne({ _id: req.params.id })
    .then(suc => res.send({ mesage: 'Admin deleted successfully' }))
    .catch(err => res.send({ message: 'failed to delete admin' }))
})

//admin
router.delete('/admin/logout',(req, res)=>{
  admin.findById(req.user._id, function(err, userdata){
      console.log(req.token)
    var  deletetoken = {token : req.token}
    var  delete1 = userdata.tokens.splice(userdata.tokens.indexOf(deletetoken), 1);
      userdata.tokens= userdata.tokens.pull(delete1[0]._id)
      console.log(userdata.tokens)
      userdata.save((err, data) => {
          if(err) return res.send({
              success : false,
              message : err.message
          })
      })
      return res.send({
          success : true,
          message : "Logged Out",

      })
  })
})

module.exports = router;