const mongoose = require('mongoose'); //third party to connect mongodb

mongoose.connect('mongodb://127.0.0.1:27017/Fithub',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
})