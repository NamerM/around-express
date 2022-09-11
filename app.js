const express = require('express');
const mongoose = require('mongoose');
//const bodyParser = require('body-parser')
const helmet = require('helmet');

const app = express();

mongoose.connect('mongodb://localhost:27017/mydb');

const { PORT = 3000 } = process.env;
const { router } = require('./routes');

//app.use(bodyParser);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/', router);

app.use((req, res, next) => {
    req.user = {
      _id: '5d8b8592978f8bd833ca8133'
    };

    next();
})
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});
