const User = require('../models/user');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'An error has occured, server side' }));
};

const getUser = (req, res) => {
  const { id } = req.params.id;

  User.findById(id)
    .orFail(() => {
      const error = new Error('User id is not found');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send('Invalid Id Format');
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error ...' });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar, about } = req.body;

  User.create({ name, avatar, about })
    .then((users) => res.status(201).send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Bad Request' });
      } else {
        res.status(500).send({ message: 'Internal Server Error ...' });
      }
    });
};

const updateUserData = (req, res) => {
  const { body } = req.body;
  const { id } = req.user._id;

  User.findByIdAndUpdate(id, body, { new: true }, { runValidators: true })
    .orFail(() => {
      const error = new Error('User Id is not found');
      error.status = 404;

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'Cast Error') {
        res.status(400).send({ message: 'User id is not correct' });
      } else if (err.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ooopsss Mulder something went wrong...' });
      }
    });
};

const updateAvatar = (req, res) => {
  const avatar = req.body;

  if (!avatar) {
    return res.status(400).send({ message: 'Avatar should have inputs! - Can\'t leave avatar empty!' });
  }
  return updateUserData(req, res);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: ' Can\'t leave the field empty!' });
  }
  return updateUserData(req, res);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateAvatar,
  updateUser,
};
