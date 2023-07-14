const jwt = require('jsonwebtoken')
const userModel = require('../model/User.model.js')
const maxAge = 30 * 24 * 60 * 60;

const createToken = ({ id }) => {
    return jwt.sign(id, process.env.JWT_SECRET, { maxAge });
}

const errorHandler = (err) => {
    let error = { email: '', password: '' };
    if (err.message.includes('user validation failed')) {
        Object.keys(err.errors).forEach(item => {
            if (item.path === 'email') {
                error.email = item.message
            }
            if (item.path === 'password') {
                error.password = item.message
            }
        })
    }
}

const signup = async (req, res) => {
    const { email, password, name, profileImage } = req.body;
    try {
        const user = await userModel.create({ email, password, name, profileImage });
        const token = createToken(user._id)
        res.status(200).json({ user, token });
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
}

const login = async (req, res) => {

}

const isLoggedin = async (req, res) => {
    const token = req.headers.Authorization.trim().split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(401).send({ success: false });
    }
}

module.exports = {
    signup, login, isLoggedin
}