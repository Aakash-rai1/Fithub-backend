const express = require('express'); //third party
const user = require('../models/workoutModel');
const router = express.Router();
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const video = require('../models/videoModel')
const upload = require('../middleware/upload')


router.post('/video/add', upload.single('image'),
 function(req, res){
        const vname= req.body.vname
        const link= req.body.link   
        const v = new video({vname : vname, link : link,image:req.file.filename});
        v.save()
       
            .then(function(result){
                // success insert
                res.status(201).json({success: true,
                    message : "video added successfully"});

            })
            .catch(function(err){
                res.status(500).json({success: false,
                    message : err})
            });
            console.log("Sucessfully Registered Workout");

    }

)


router.get('/video/display' , function (req, res) {

    video.find().then(function (data) {
      res.send({data:data,success:true})
    })
  })
  
//single view
router.get('/video/:vname', function(req,res){
    const vname = req.params.vname;  
    video.findOne({vname : vname })
    .then(function(data){
      console.log(data)
        res.status(200).json(data);
    })

    .catch(function(e){
      console.log('here')
        res.status(500).json({message:e})
    })
})

//single display
router.get('/video/single/:id', function(req,res){
  const id = req.params.id;
  // finone  **find  
  video.findOne({_id : id }) 
  .then(function(data){
      res.status(200).json({ success: true, data: data });
  })

  .catch(function(e){
      res.status(500).json({message:e})
  })
})


router.put('/video/update/:id',(req,res)=>{
    const id=req.body.id
    const vname=req.body.vname
    const link=req.body.link
  
    video.updateOne({_id:id},{vname:vname,link:link}).then(function(){
        res.status(200).json({success:true,msg:"Succesfully Updated"})
    }).catch(function(e){
        res.status(500).json({success:false})
    })
  })
  
router.delete('/video/delete/:id', function(req,res){
    console.log(req.body,req.params.id)

    video.deleteOne({_id:req.params.id})
    .then(suc=>res.send({mesage:'deleted successfully'}))
    .catch(err=>res.send({message:'failed to delete'}))
})



module.exports = router;