const router = require('express').Router();
//const fs = require('fs').promises;

//routers step 3
const { getAllCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');  //controllers - users or cards- check b4 submit

router.get('/cards', getAllCards)
router.delete('/cards/:cardId', deleteCard)
router.post('/cards', createCard)
router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/dislikes', dislikeCard)


module.exports = {
  cardRouter: router,
};


