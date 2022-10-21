const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', (req, res) => {

    const task = new Task(req.body)
  
    task.save().then(() => {
      console.log(task)
    }).catch((error) => {
      console.log(error)
    })
  
  })
  
  
  router.get('/tasks', (req, res) => {
  
    Task.find({}).then((tasks) => {
      console.log(tasks)
    }).catch((error) => {
      res.status(500).send()
    })
  
  })
  
  router.get('/tasks/:id', (req, res) => {
  
    Task.find({"_id" : req.params.id}).then((task) => {
      if(!task){
        return res.status(404).send()
      }
      console.log(task)
    }).catch((error) => {
      res.status(500).send()
    })
  
  })
  
  router.patch('/tasks/:id', (req, res) => {
  
    Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}).then((task)=>{
      console.log(task)
    }).catch((e) => {
      res.status(500).send()
    })
  
  })
  
  
  router.delete('/tasks/:id', (req, res) => {
  
    Task.findByIdAndDelete(req.params.id).then((task)=>{
      console.log(task)
    }).catch((e) => {
      res.status(500).send()
    })
  
  })

  
  module.exports = router