const express = require('express'); //third party
const router = express.Router();
const User = require('../models/user');

router.post('/insert', function(req, res){
    const me = new User(req.body);
    console.log(req.body);
    me.save().then((d)=>{
        res.send(d)
    }).catch((e)=>{
        res.send(e)
    });

})

router.get('/display', function(req,res){
    //select * from product
    User.find().then(function(data){
        res.send(data)
        // console.log(data)
    })
})

//delete product
router.delete('/delete/:id', function(req,res){

     const id = req.params.id;
     User.deleteOne({_id : id}).then(function(){
         res.send("Deleted")
     });
})

//update products
router.put('/update/:id', function(req,res){
    const id = req.params.id; 
    const uname1 = req.body.uname;
    User.updateOne({_id : id}, {uname : uname1}).then(function(){
        res.send("Updated")
    })

})
module.exports = router;