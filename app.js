const express = require('express'); //third party
const bodyParser = require('body-parser'); //core module
const db = require('./db/db');
const route = require('./routes/userRoute');
const workout = require('./routes/workoutRoute')
const video = require('./routes/videoRoute')
const admin= require('./routes/adminRoute')
const fav= require('./routes/addFavRoute')
const path = require("path")

const cors= require('cors');


const app = express();
app.use(express.json());
app.use(cors());
app.use(route);
app.use(admin);
app.use(workout);
app.use(fav);
app.use(video);
app.use(express.static(path.join(__dirname, '/media')));
app.use(bodyParser.urlencoded({extended:false}));

// app.use(db);
app.listen(1500);