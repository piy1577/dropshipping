const jwt = require('jsonwebtoken')
const userModel = require('../model/User.model.js')
import { google } from 'googleapis';

const createToken = ({ id }) => {
    return jwt.sign(id, process.env.JWT_SECRET);
}

const errorHandler = (err) => {
    let error = { email: '', password: '' };
    if (err.message === 'invalid Email') {
        error.email = 'invalid email'
        return error;
    }

    if (err.message === 'invalid password') {
        error.password = 'invalid password'
        return error;
    }

    if (err.code === 11000) {
        error.email = "Email already exists";
        return error;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(item => {
            if (item.path == 'email') {
                error.email = item.message
            }
            if (item.path == 'password') {
                error.password = item.message
            }
        })
    }
    return error;
}

const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await userModel.create({ email, password, name });
        const token = createToken(user._id)
        user.password = undefined;
        res.status(200).json({ success: true, user, token });
    } catch (err) {
        const error = errorHandler(err);
        console.log(err);
        res.status(401).json({ success: false, message: error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        user.password = undefined;
        res.status(200).json({ success: true, user, token });
    } catch (err) {
        const error = errorHandler(err);
        res.status(401).json({ success: false, error });
    }
}

const isLoggedin = async (req, res) => {
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({ success: true });
    } catch (err) {
        console.log(err);
        res.status(401).send({ success: false });
    }
}

const oauth2Client = new google.auth.Oauth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const googlesignup = (req, res) => {

}

module.exports = {
    signup, login, isLoggedin
}