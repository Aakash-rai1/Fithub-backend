const express = require('express'); //third party
const user = require('../models/userModel');
const router = express.Router();
// const Product = require('../models/productModel'); 
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const { request } = require('http');
const { resolveSoa } = require('dns');
const auth = require('../middleware/auth')
const upload= require('../middleware/upload')
const jwt = require('jsonwebtoken')


var ObjectID = require('mongodb').ObjectID;


router.post('/user/add',
  [
    check('email', "Invalid Email Address ").isEmail(),
    check('fname', "You must enter fname").not().isEmpty()

  ],
  function (req, res) {
    const errors = validationResult(req);
    console.log(errors.array())

    //is empty
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array())
    }
    else {

      const fname = req.body.fname
      const lname = req.body.lname
      const gender = req.body.gender
      const age = req.body.age
      const email = req.body.email
      const weight = req.body.weight
      const height = req.body.height
      const password = req.body.password




      bcrypt.hash(password, 10, function (err, hash) {
        console.log(hash)
        const me = new user({ fname: fname, lname: lname, gender: gender, age: age, weight: weight, height: height, email: email, password: hash });
        me.save()
          .then(function (result) {
            // success insert
            res.status(201).json({
              success: true,
              message: "Registered success"
            });
            console.log('success')

          })
          .catch(function (err) {
            res.status(500).json({
              success: false,
              message: err
            })
          });
        console.log("Sucessfully Registered");
      })

    }

  })

//login >------
// router.post('/user/login', async function (req, res) {
//   try{
//   const email = req.body.email
//   const password = req.body.password
//   const Users = await user.checkCrediantialsDb(email,
//       password)
//       const token = await Users.generateAuthToken()
//       res.status(200).json({
//         success: true,
//         message: "User login successful",
//         token: token,
//         id: Users._id
//       })
//     }
//     catch(e){
//       res.status(200).json({
//         success:false,
//         message:"invalid credential"
//       })
//     }
//   })

router.post('/user/login', async function (req, res) {
  try{
    const email = req.body.email
    const password = req.body.password
    const Users = await user.checkCrediantialsDb(email,
      password)
  const token = await Users.generateAuthToken()
      res.status(200).json({
        success: true,
        message: "user login success",
        token: token,
        id: Users._id
      })
    }
    catch(e){
      const token=''
      res.status(200).json({
        token:token,
        success:false,
        message:"invalid credential"
      })
    }
  })



  router.get('/checkuserlogin',auth.verifyUser, async function(req,res) {
    // res.send(req.data)
   
        res.send(req.user)
    
    
   
  })


// router.get('/user/view/:id',  function (req, res) {
//   const id = req.params.id
//   user.findOne({ _id: id })
//     .then(function (data) {
//       console.log(data)
//       res.status(200).json({ success: true, data: data });

//     })
//     .catch(function (e) {
//       res.status(201).json({ success: false, message: "here" })
//     })

// })


//single display
router.get('/user/single/:id', function(req,res){
  const id = req.params.id;  
  user.findOne({_id : id })
  .then(function(data){
      res.status(200).json({success: true,data: data});
  })

  .catch(function(e){
      res.status(500).json({success: false, message:e})
  })
})



router.get('/user/display' ,auth.verifyAdmin, function (req, res) {

  user.find().then(function (data) {
    res.send({data:data,success:true})
  })
})






router.put('/user/updatea/:id',(req,res)=>{
  const id=req.body.id
  const fname=req.body.fname
  const lname=req.body.lname

  user.updateOne({_id:id},{fname:fname,lname:lname}).then(function(){
      res.status(200).json({success:true,msg:"Succesfully Updated"})
  }).catch(function(e){
      res.status(500).json({success:false})
  })
})


router.put('/user/update/:_id',auth.verifyUser, function(req,res){
  console.log(req.body);
  console.log(req.params._id)
  user.findOneAndUpdate({_id:ObjectID(req.params._id)}, req.body).then(function () {
      res.status(200).send().catch(function (e) {
          res.status(400).send()
      })
  })

  })

router.delete('/user/delete/:id', function (req, res) {
  console.log(req.body, req.params.id)

  user.deleteOne({ _id: req.params.id })
    .then(suc => res.send({ mesage: 'deleted successfully' }))
    .catch(err => res.send({ message: 'failed to delete' }))
})

router.put('/updateProfile/:_id',auth.verifyUser,upload.single('image'),function(req,res){
  try{
        const User = {
            image: req.file.filename
        }
        user.findOneAndUpdate({_id:ObjectID(req.params._id)}, User).then(function () {
            res.status(200).send().catch(function (e) {
                res.status(400).send()
            })
        })
      }
      catch{
        console.log("profile pic not updated")
  
      }
    
  })

router.put('/user/:id/photo', function (req, res) {
  const user = console.log(req.params.id)
  if (!user) {
    return next(
      new ErrorResponse(`No user found with ${req.params.id}`),
      404
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo and accept any extension of an image
  // if (!file.mimetype.startsWith("image")) {
  //   return next(new ErrorResponse(`Please upload an image`, 400));
  // }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `photo_${user.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.err(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    //insert the filename into database
    await user.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
  });

  res.status(200).json({
    success: true,
    data: file.name,
  });
})

//logout
router.delete('/user/logout',(req, res)=>{
  user.findById(req.user._id, function(err, userdata){
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