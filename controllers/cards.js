const Card = require('../models/card');

const getAllCards = (req, res) => {
  Card.find({})
      .then(cards => res.status(200).send({ data: cards }))
      .catch(() => res.status(500).send({ message: 'An error has occured, server side'}))
}

const createCard = (req, res) => {
  const { name, likes, link } = req.body

  const owner = req.user._id

  Card.create({ name, likes, link, owner })
      .then(card => res.status(201).send({ data: card }))
      //.catch(() => res.status(500).send({ message: 'An error has occured, server side'}))
      .catch((err) => {
        console.log('err =>', err)
        if(err.name === 'ValidationError') {
          const message = `${Object.values(err.errors).map((key) => errors[key].message).join(', ')}` //c.point
          res.status(400).send({ message: 'Bad Request, Invalid data format' })
        } else {
          res.status(500).send({ message: 'Internal Server Error ...' })
        }
      })
}

const deleteCard = (req, res) => {
  const { cardId } = req.params

  Card.findByIdAndRemove(cardId)
      .orFail(() => {
        const error = new Error('Card not found')
        error.status === 404
        throw error
      })
      .then(() => res.status(200).send({ message: 'Card successfully removed', data: card }))
      .catch((err) => {
        console.log('err =>', err)
        if(err.name === 'CastError') {
          res.status(400).send({ message: 'Bad Request, Invalid data format' })
        } else if(err.status === 404) {
          res.status(404).send({ message: err.message })
        } else {
          res.status(500).send({ message: 'Internal Server Error ...' })
        }
      })
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard
}