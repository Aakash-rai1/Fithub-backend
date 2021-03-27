const express = require('express'); //third party
const admin = require('../models/adminModel');
const router = express.Router();

const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator');
const { request } = require('http');
const { resolveSoa } = require('dns');
const jwt = require('jsonwebtoken')

router.post('/admin/add',
[
    check('email', "Invalid Emial Address ").isEmail(),
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
                    console.log('success')

            })
            .catch(function(err){
                res.status(500).json({success: false,
                    message : err})
            });
            console.log("Sucessfully Registered");
        })

    }

})

module.exports = router;