const express = require('express');
const { signup, login, isLoggedin } = require('./User.controller.js');
const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/isloggedin', isLoggedin);

module.exports = userRouter;