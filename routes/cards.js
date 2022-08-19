const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('../data/card.json', { encoding: 'utf8' })//  readFileSync ile readFile farkı, (err, data )=> {} promise olduugndan gerek yok
    .then((cards) => {
      console.log(cards);
      res.send({ data: JSON.stringify(cards) });
    })
    .catch(() => res.send({ message: 'Card Not Found' }).status(500));
});

module.export = {
  cardRouter: router,
};
