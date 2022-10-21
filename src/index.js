const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

require('./DB/mongoDB')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')


const app = express()
const publicDirectoryPath = path.join(__dirname, '/public')
const port = process.env.PORT || 3000


// MIDDLEWARES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirectoryPath))
app.use(userRouter)
app.use(taskRouter)


app.get('/', (req, res) => {
  res.send("Hello World")
})


app.listen(3000, () => {
  console.log("Server is up and running on port " + port)
})



