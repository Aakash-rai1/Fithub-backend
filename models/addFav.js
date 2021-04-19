const mongoose=require('mongoose')
const AddFav=mongoose.model('Fav',{
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    }
})
module.exports=AddFav