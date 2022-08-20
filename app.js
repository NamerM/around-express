const express = require('express');
const helmet = require('helmet');

const app = express();

const { PORT = 3000 } = process.env;
const { router } = require('./routes');

app.use(helmet());
app.use('/', router);
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});
