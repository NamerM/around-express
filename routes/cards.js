const router = require('express').Router();
const fs = require('fs').promises;

//routers step 3
const { getAllCards, createCard, deleteCard } = require('../controllers/cards');  //controllers - users or cards- check b4 submit

router.get('/cards', getAllCards)
router.delete('/cards/:cardId', deleteCard)
router.post('/cards', createCard)


router.get('/', (req, res) => {
  fs.readFile('./data/cards.json', { encoding: 'utf8' })//  readFileSync ile readFile farkı, (err, data )=> {} promise olduugndan gerek yok
    .then((cards) => {
      console.log(cards);
      res.send({ data: JSON.stringify(cards) });
    })
    .catch((err) => {
      console.log('err =>', err);
      res.status(500).send({ message: 'Card Not Found' });
    });
});




module.exports = {
  cardRouter: router,
};
