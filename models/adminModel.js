const mongoose = require('mongoose'); //Third Party
const admin = mongoose.model('admin', {
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        require:true,
        unique : true
    },
    password:{
    type:String
}
})

module.exports = admin;