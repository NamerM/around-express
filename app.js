const express = require('express');
const { routerMain } = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

app.use('/', routerMain);
app.get('*', (req, res) => {
  res.send({ message: 'Requested resource not found' }).status(404);
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});

// const users = require('./data/users.json'); gerek yok bunlara
// const cards = require('./data/cards.json'); gerek yok

// const { userRouter } = require('./users');
// const { cardRouter } = require('./cards');

// app.use('/users', userRouter);
// app.use('/cards', cardRouter);
