const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('../data/users.json', { encoding: 'utf8' })
    .then((users) => {
      console.log(users);
      res.send({ data: JSON.stringify(users) });
    })
    .catch(() => res.send({ message: 'Card Not Found' }).status(500));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('../data/users.json', { encoding: 'utf8' })
    .then((users) => {
      const data = JSON.parse(JSON.stringify(users));
      data.find((user) => user._id === id);
      if (users) {
        res.send(users);
      } else {
        res.send({ message: 'User ID not found' }).status(404);
      }
    })
    .catch(() => res.send({ message: 'Card Not Found' }).status(500));
});

module.export = {
  userRouter: router,
};
