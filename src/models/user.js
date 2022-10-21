const mongoose = require('mongoose')

const User = mongoose.model('User', {
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
        type : String
    },
    password : {
        type : String
    }
})

module.exports = User