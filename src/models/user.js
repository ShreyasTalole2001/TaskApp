const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    }
})


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