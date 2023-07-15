const express = require('express');
const { signup, login, isLoggedin, googleSignup, googleLogin } = require('./User.controller.js');
const userRouter = express.Router();


userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/isloggedin', isLoggedin);
userRouter.post('/google/signup', googleSignup)
userRouter.post('/google/login', googleLogin)

module.exports = userRouter;