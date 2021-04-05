const jwt = require('jsonwebtoken')
//model
const User = require('../models/userModel')
const Admin = require('../models/adminModel')

// module.exports.verifyUser = async (req, res, next) =>{
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = jwt.verify(token, 'this is user auth')
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token
//        })
//         if (!user) {
//         throw new Error()
//         }
//         req.token = token
//         req.user = user
//         next()
//         } catch (e) {
//         res.status(401).send({ error: 'Please authenticate.' })
//         }


    // try{
    //     console.log(req.headers.authorization)
    //     const token = req.headers.authorization.split(" ")[1];
    //     // console.log(token)
    //     const decodeData = jwt.verify(token, 'secretkey')
    //     User.findOne({_id : decodeData.userId})
    //     .them(function(result){
    //         //success
    //         req.user = result
    //         next()
           
    //     })
    //     .catch(function(err){
    //         console.log(err)

    //         res.status(401).json({message : err})
    //     })
    // }
    // catch(err){
    //         console.log(err)

    //     res.status(401).json({message : "Unauthorized access!!"})
    // }
// }


module.exports.verifyUser =  async (req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismynewcourse')
    console.log(decoded)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token
   })
    if (!user) {
    throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
    }
   }
 
   module.exports.verifyAdmin=  async (req, res, next) => {
    try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismynewcourse')
    const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token
   })
    if (!user) {
    throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
    }
   }