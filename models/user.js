const mongoose= require('mongoose');

const User= mongoose.model('User',{
    name:{
        type: String,
        require: true,
        trim: true
    },
    uname:{
        type: String,
        require: true,
        trim: true
    },
    gender:{
        type: String,
        require: true,
        trim: true
    },
    height:{
        type: String,
        require: true,
        trim: true
    },
    weight:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    },
    image:{
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

module.exports = User;