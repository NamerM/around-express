const router = require('express').Router();
//const fs = require('fs').promises;

//step 3 project13
const { getAllUsers, getUser, createUser, updateAvatar, updateUser } = require('../controllers/users');

router.get('/users', getAllUsers)
router.get('/users/:userId', getUser)
router.post('/users', createUser)
router.patch('/users/me', updateUser)
router.patch('/users/me/avatar', updateAvatar)


module.exports = {
  userRouter: router,
};

