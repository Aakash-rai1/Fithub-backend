const jwt = require('jsonwebtoken')
//model
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

module.exports.verifyUser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const decodeData = jwt.verify(token, 'secretkey')
        User.findOne({_id : decodeData.userId})
        .them(function(result){
            //success
            req.user = result
            next()
           
        })
        .catch(function(err){
            res.status(401).json({message : err})
        })
    }
    catch(err){
        res.status(401).json({message : "Unauthorized access!!"})
    }
}


module.exports.verifyAdmin = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const decodeData = jwt.verify(token, 'secretkey')
        Admin.findOne({_id : decodeData.userId})
        .them(function(result){
            //success

            req.user = result
            next()
           
        })
        .catch(function(err){
            res.status(401).json({message : err})
        })
    }
    catch(err){
        res.status(401).json({message : "Unauthorized access!!"})
    }
}
