const express= require('express');
const bodyParser = require('body-parser');
const db = require('./database/database');
const route = require('./routes/adminRoute')
// const route = require('./routes/userRoute')


const app= express();
app.use(express.json());
app.use(route);
app.use(bodyParser.urlencoded({extended:false}));

// app.use(db);
app.listen(100);