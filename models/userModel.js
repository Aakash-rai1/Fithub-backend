const mongoose = require('mongoose');

const jwt = require('jsonwebtoken') //Auth Token handle
const bcrypt = require('bcryptjs')
//Third Party
const user = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    height: {
        type: String
    },
    weight: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String
    },

    image: {
        type: String,
        trim: true,
        default: 'no-image'
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
})

user.statics.checkCrediantialsDb = async (email, password) => {


    const user = await users.findOne({ email: email })
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
user.methods.generateAuthToken = async function () {
    const userAuth = this
    const token = jwt.sign({ _id: userAuth._id.toString() }, 'thisismynewcourse')

    console.log(token);
    userAuth.tokens = userAuth.tokens.concat({ token: token })
    await userAuth.save()
    return token
}
const users = mongoose.model('User', user)

module.exports = users;