const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', (req, res) => {

    const user = new User(req.body)
  
    user.save().then(() => {
      console.log(user)
    }).catch((error) => {
      console.log("Error " + error)
    })
  
  })

  router.get('/users', (req, res) => {

    User.find({}).then((users) => {
      console.log(users)
    }).catch((error) => {
      console.log(error)
    })
  
  })
  
  router.get('/users/:id', (req, res) => {
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
  
  router.patch('/users/:id', (req, res) => {
  
    User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true}).then((user) => {
      
      if(!user){
        return res.status(404).send()
      }
      console.log(user)
      console.log("User updated successfully")
    }).catch((e)=> {
      res.status(500).send()
    })
  
  })

  router.delete('/users/:id', (req, res) => {

    User.findByIdAndDelete(req.params.id).then((user)=>{
  
    }).catch((e) => {
      res.status(500).send()
    })
  
  })

module.exports = router
