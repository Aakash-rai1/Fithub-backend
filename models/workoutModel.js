const mongoose = require('mongoose'); //Third Party
const workout = mongoose.model('workout', {
    wname:{
        type:String
    },
    program:{
        type:String,
        require:true,
    
    },
    link:{
    type:String
    },
    image:{
        type:String
    }
})

module.exports = workout;