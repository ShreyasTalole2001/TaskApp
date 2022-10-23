const express = require('express')
const router = new express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/users', async (req, res) => {

  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }

})

router.get('/users', async (req, res) => {

  try {
    const users = await User.find({})
    console.log(users)
  } catch (e) {
    console.log(e)
  }

})

router.get('/users/:id', async (req, res) => {


  try {
    const user = await User.find({ "_id": req.params.id })
    if (!user) {
      return res.status(404).send()
    }
    console.log(user)
  } catch (e) {
    console.log(e)
  }


})

router.patch('/users/:id', async (req, res) => {

  const updates = Object.keys(req.body)

  try {
    const user = await User.findById(req.params.id)

    updates.forEach((update) => {
      user[update] = req.body[update]
    })

    await user.save()
  } catch (e) {
    res.status(500).send()
  }


})

router.delete('/users/:id', async (req, res) => {

  try {
    const user = await User.findByIdAndDelete(req.params.id)
    console.log(user)
  } catch (e) {
    console.log("Error " + e)
  }

})

// USER LOGIN
router.post('/user/login', async (req, res) => {


  const email = req.body.email
  try {

    const user = await User.findOne({ "email": email })
    if (!user) {
      throw new Error("Unable to login")
    }

    const isMatched = await bcrypt.compare(req.body.password, user.password)
    console.log(isMatched)

    if (!isMatched) {
      throw new Error("Unable to login, Wrong password")
    }

    res.send(user)


  } catch (e) {
    console.log("Error" + e)
  }



})

module.exports = router
