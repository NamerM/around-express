const User = require('../models/user')

const getAllUsers = (req, res) => {
  User.find({})
      .then(users => res.status(200).send({ data: users }))
      .catch(() => res.status(500).send({ message: 'An error has occured, server side'}))
}

const getUser = (req, res) => {
  const { id } = req.params

  User.findById(id)
    .orFail(() => {
      const error = new Error('User id is not found')
      error.status = 404
      throw error
    })
    .then(user => {
      res.status(200).send({ data: user })
    })
    .catch((err) => {
      if(err.name === 'CastError') {
          res.status(400).send('Invalid Id Format')
      } else if(err.status === 404) {
          res.status(404).send({ message: err.message })
      } else {
          res.status(500).send({ message: 'Internal Server Error ...' })
      }
    })
}

const createUser = (req, res) => {
  const { name, avatar, about} = req.body

  User.create({ name, avatar, about })
      .then(users => res.status(201).send({ data: users }))  //user or users check...
      .catch((err) => {
        console.log('err =>', err)
        if(err.name === 'ValidationError') {
          'The name length should be in between 2 to 30 characters, The url of the avatar must be in correct form'
          const message = `${Object.values(err.errors).map((key) => errors[key].message).join(', ')}` //c.point
          res.status(400).send({ message: 'Bad Request' })
        } else {
          res.status(500).send({ message: 'Internal Server Error ...' })
        }
      })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser
}