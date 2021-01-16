const mongoose= require('mongoose');

const Admin= mongoose.model('Admin',{
    name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
})

module.exports = Admin;