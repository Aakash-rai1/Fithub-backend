const  user = require("../models/admin")
var ObjectID = require('mongodb').ObjectID; 
//function for adding trip
exports.addUser = (req, res) => {
    const User = new user(
        req.body)
    User.save().then(function () {
        res.status(200).send()
    }).catch(function (e) {
        res.status(400).send()
    })
}

//function for getting trip
exports.findUser = async (req, res) => {
    user.find().then(function (findAllUser) {
        res.send(findAllUser).catch(function (e) {
            res.status(400).send()
        })
    })
}
//function for getting trip by id
exports.findUserById = (req, res) => {
    user.findById(req.params._id)
        .then(function (userById) {
            res.send(userById).catch(function (e) {
                res.status(400).send()
            })
        })
}

//fuction for delete trip by id 
exports.deleteUserById = (req, res) => {
    user.findByIdAndDelete(req.params._id).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}

//function for update trip 
exports.updateUser = (req, res) => {
  
    console.log(req.body);
    console.log(req.params._id)
    user.findOneAndUpdate({_id:ObjectID(req.params._id)}, req.body).then(function () {
        res.status(200).send().catch(function (e) {
            res.status(400).send()
        })
    })
}



//function for Login Function
exports.login = async (req, res) => {
    try {
        const Users = await user.checkCrediantialsDb(req.body.email,
            req.body.password)
        const token = await Users.generateAuthToken()
        res.send(token)
    }
    catch (e) {
        res.status(400).send()
    }
}



// exports.uploadimage = (req, res) => {
//     req.files.map(function (items) {
//         const User = {
//             image: items.filename
//         }
//         user.findOneAndUpdate({_id:ObjectID(req.params._id)}, User).then(function () {
//             res.status(200).send().catch(function (e) {
//                 res.status(400).send()
//             })
//         })
//     })
// }

//function for Login Function
exports.checklogin = async (req, res) => {
    res.send(req.user)
}

//function for email validation
exports.checkemail = (req, res) => {
    user.findOne({email:req.params.email}).then(function (findAllUser) {
        res.send(findAllUser).catch(function (e) {
            res.send(e)
        })
    })
}

//fuction for logout 
exports.logout=(req, res)=>{
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
}