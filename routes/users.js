const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('./data/users.json', { encoding: 'utf8' })
    .then((users) => {
      console.log(users);
      res.send({ data: JSON.stringify(users) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'User Not Found' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./data/users.json', { encoding: 'utf8' })
    .then((users) => {
      const data = JSON.parse(users);
      const user = data.find((user) => user._id === id);
      console.log(user);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User ID not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'User Not Found' });
    });
});

module.exports = {
  userRouter: router,
};
