const express = require('express');
const { signup,
    login,
    isLoggedin,
    googleSignup,
    googleLogin,
    changeProfileImage,
    changePassword,
    changeName,
    changeEmail,
    cartHandler,
    payment,
    paymentVerification,
    getKey
} = require('./User.controller.js');
const userRouter = express.Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/isloggedin', isLoggedin)
userRouter.post('/google/signup', googleSignup)
userRouter.post('/google/login', googleLogin)
userRouter.post('/image', changeProfileImage)
userRouter.post('/changePassword', changePassword)
userRouter.post('/name', changeName)
userRouter.post('/email', changeEmail)
userRouter.post('/forgotPassword');
userRouter.get('/forgotPassword');
userRouter.post('/cart', cartHandler);
userRouter.post('/payment', payment);
userRouter.post('/payment/verification', paymentVerification);
userRouter.get('/payment/getkey', getKey)

module.exports = userRouter;