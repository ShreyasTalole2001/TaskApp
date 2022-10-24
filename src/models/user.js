const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    age: {
        type : Number,
        validate(value){
            if(value < 0){
                throw new Error("Age cannot be -Ve")
            }
        },
    },
    email : {
        type : String,
        unique: true
    },
    password : {
        type : String
    },
    tokens: [{
        token:{
            type: String,
            require: true
        }
    }]
})


// static is accessible on models and methods are accessible on instances
// this function generate authentication token
userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({_id: user._id.toString()},'thisismysecreat')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token

} 

// This is a middleware to run before saving to chech
// if password is hashed or not
userSchema.pre('save', async function (next) {
    
    console.log("Just before saving user")

    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User