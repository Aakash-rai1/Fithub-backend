const express = require('express'); //third party
const user = require('../models/workoutModel');
const router = express.Router();
// const Product = require('../models/productModel'); 
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator');
const { request } = require('http');
const { resolveSoa } = require('dns');
const jwt = require('jsonwebtoken')
const workout = require('../models/workoutModel')
const upload = require('../middleware/upload')
router.post('/workout/add', upload.single('image'),
// [
//     check('wname', "You must enter wname").not().isEmpty()

// ],
 function(req, res){
    // const  errors = validationResult(req);
    // console.log(errors.array())

    // //is empty
    // if(!errors.isEmpty()){
    //     res.status(400).json(errors.array())
    // }
    // else{

        const wname= req.body.wname
        const program= req.body.program
        const image=req.body.image
        
        const wo = new workout({wname : wname, program : program,image:req.file.filename});
        wo.save()
            .then(function(result){
                // success insert
                res.status(201).json({success: true,
                    message : "Workout added successfully"});

            })
            .catch(function(err){
                res.status(500).json({success: false,
                    message : err})
            });
            console.log("Sucessfully Registered Workout");

    }

)


router.get('/workout/display', function(req,res){
    workout.find()
    .then(function (workoutdisplay) {
      res.status(200).json({
        success: true,
        data: workoutdisplay,
      });
    })
    .catch(function (error) {
      res.status(500).json({ success: false, message: error });
    });
})

//single display
router.get('/workout/single/:id', function(req,res){
    const id = req.params.id;
    // finone  **find  
    workout.find({_id : id }) 
    .then(function(data){
        res.status(200).json({ success: true, data: data });
    })
 
    .catch(function(e){
        res.status(500).json({message:e})
    })
})


router.put('/update/workout/:id', function(req,res){
    console.log(req.body,req.params.id)
    const {wname} = req.body
    workout.updateOne({_id:req.params.id,$set:{wname}})
    .then(suc=>res.send({mesage:'updateded successfully'}))
    .catch(err=>res.send({message:'failed to update'}))
})

router.put('/delete/workout/:id', function(req,res){
    console.log(req.body,req.params.id)

    workout.deleteOne({_id:req.params.id})
    .then(suc=>res.send({mesage:'deleted successfully'}))
    .catch(err=>res.send({message:'failed to delete'}))
})



module.exports = router;