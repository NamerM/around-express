const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('../data/users.json', { encoding: 'utf8' })
    .then((users) => {
      res.send({ data: JSON.stringify(users) });
    })
    .catch(() => res.send({ message: 'User Not Found' }).status(500));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('../data/users.json', { encoding: 'utf8' })
    .then((users) => {
      console.log('users =>', users);
      const data = JSON.parse(JSON.stringify(users));
      const user = data.find(user => user._id === id);

      if(user) {
        res.send(user);
      } else {
        res.send({ message: 'User ID not found' }).status(404);
      }
    })
    .catch(() => res.send({ message: 'User Not Found' }).status(500));
});

module.exports = {
  userRouter: router,
};
