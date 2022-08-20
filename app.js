const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const { router } = require('./routes');

app.use('/', router);
app.get('*', (req, res) => {
  res.send({ message: 'Requested resource not found' }).status(404);
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});
