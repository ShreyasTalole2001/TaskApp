const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

require('./DB/mongoDB')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const publicDirectoryPath = path.join(__dirname, '/public')
const port = process.env.PORT || 3000

// MIDDLEWARES
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
  res.send("Hello World")
})

// Creating Resources
app.post('/users', (req, res) => {

  const user = new User(req.body)

  user.save().then(() => {
    console.log(user)
  }).catch((error) => {
    console.log("Error " + error)
  })

})

app.post('/tasks', (req, res) => {

  const task = new Task(req.body)

  task.save().then(() => {
    console.log(task)
  }).catch((error) => {
    console.log(error)
  })

})


app.get('/users', (req, res) => {

  User.find({}).then((users) => {
    console.log(users)
  }).catch((error) => {
    console.log(error)
  })

})

app.get('/users/:id', (req, res) => {
  // console.log(req.params)

  User.find({ "_id": req.params.id }).then((user) => {
    if(!user){
      return res.status(404).send()
    }
    console.log(user)
  }).catch((error) => {
    res.status(500).send()
  })

})


app.get('/tasks', (req, res) => {

  Task.find({}).then((tasks) => {
    console.log(tasks)
  }).catch((error) => {
    res.status(500).send()
  })

})

app.get('/tasks/:id', (req, res) => {

  Task.find({"_id" : req.params.id}).then((task) => {
    if(!task){
      return res.status(404).send()
    }
    console.log(task)
  }).catch((error) => {
    res.status(500).send()
  })

})



app.listen(3000, () => {
  console.log("Server is up and running on port " + port)
})



