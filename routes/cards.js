const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('./data/cards.json', { encoding: 'utf8' })//  readFileSync ile readFile farkı, (err, data )=> {} promise olduugndan gerek yok
    .then((cards) => {
      console.log(cards);
      res.send({ data: JSON.stringify(cards) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Card Not Found' });
    });
});

//routers step 5
const { getAllCards, getUser, createCard } = require('../controllers/cards');  //controllers - users or cards- check b4 submit

router.get('/cards', getAllCards)
router.delete('/cards/:cardId', getUser)
router.post('/cards', createCard)


module.exports = {
  cardRouter: router,
};
