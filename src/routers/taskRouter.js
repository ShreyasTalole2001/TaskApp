const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {

  const task = new Task(req.body)

  try {
    await task.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }


})


router.get('/tasks', async (req, res) => {


  try {
    const tasks = await Task.find({})
    res.status(201).send(tasks)
    // console.log(tasks)
  } catch (e) {
    console.log(e)
  }

})

router.get('/tasks/:id', async (req, res) => {

  // Task.find({"_id" : req.params.id}).then((task) => {
  //   if(!task){
  //     return res.status(404).send()
  //   }
  //   console.log(task)
  // }).catch((error) => {
  //   res.status(500).send()
  // })


  try {

    const task = await Task.find({ "_id": req.params.id })
    if (!task) {
      return res.status(404).send()
    }
    console.log(task)

  } catch (e) {
    console.log(e)
  }

})

router.patch('/tasks/:id', async (req, res) => {

  try {

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    console.log(task)
  } catch (e) {
    res.status(500).send()
  }

})


router.delete('/tasks/:id', async (req, res) => {

  // Task.findByIdAndDelete(req.params.id).then((task) => {
  //   console.log(task)
  // }).catch((e) => {
  //   res.status(500).send()
  // })

  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    console.log(task)
  } catch (e) {
    console.log(e)
  }

})


module.exports = router