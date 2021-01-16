const express = require('express'); //third party
const Admin = require('../models/admin')
const router = express.Router();




router.post('/insert', function(req, res){
    const me = new Admin(req.body);
    console.log(req.body);
    me.save().then((d)=>{
        res.send(d)
    }).catch((e)=>{
        res.send(e)
    });

})

router.get('/display', function(req,res){
    //select * from product
    Admin.find().then(function(data){
        res.send(data)
        // console.log(data)
    })
})

//delete product
router.delete('/delete/:id', function(req,res){

     const id = req.params.id;
     Admin.deleteOne({_id : id}).then(function(){
         res.send("Deleted")
     });
})

//update products
router.put('/update/:id', function(req,res){
    const id = req.params.id; 
    const name1 = req.body.name;
    Admin.updateOne({_id : id}, {name : name1}).then(function(){
        res.send("Updated")
    })

})
module.exports = router;