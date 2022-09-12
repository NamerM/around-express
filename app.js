const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const { router } = require('./routes');


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  req.user = {
    _id: '631f220c1e56c98bfdc2f492'
  };

  next();
})

app.use('/', router);





app.get('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App is available  on port  ${PORT}...`);
});
