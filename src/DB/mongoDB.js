const mongoose = require('mongoose')

const dbURI = "mongodb://127.0.0.1:27017/task-manager-api"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to DB")
    }).catch((error) => {
        console.log(error)
    })


