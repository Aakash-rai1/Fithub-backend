const mongoose = require('mongoose'); //Third Party
const user = mongoose.model('user', {
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    gender:{
        type:String
    },
    age:{
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

module.exports = user;