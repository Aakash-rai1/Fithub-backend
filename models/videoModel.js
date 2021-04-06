const mongoose = require('mongoose'); //Third Party
const video = mongoose.model('video', {
    vname:{
        type:String
    },
    link:{
        type:String,
        require:true,
    
    },
    
    image:{
        type:String
    }
})

module.exports = video;