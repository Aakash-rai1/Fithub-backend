const mongoose = require('mongoose'); //Third Party
const jwt = require('jsonwebtoken') //Auth Token handle
const bcrypt = require('bcryptjs')

const admin =new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        require:true,
        unique : true
    },
    password:{
    type:String
},
tokens: [{
    token: {
        type: String,
    }
}]
})

admin.statics.checkCrediantialsDb = async (email, password) => {
   
   
    const user = await admins.findOne({email: email} )
    if (!user) {
        console.log('user not found')
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return user

}

// login token generate function
admin.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({ _id: userAuth._id.toString() }, 'thisismynewcourse')

    console.log(token);
    userAuth.tokens = userAuth.tokens.concat({ token: token })
    await userAuth.save()
    return token
}
const admins = mongoose.model('Admin', admin)

module.exports = admins;