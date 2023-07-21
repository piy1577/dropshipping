const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')
const userModel = require('../model/User.model.js')
const bcrypt = require('bcrypt')
const Razorpay = require('razorpay')
var crypto = require('crypto')


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET
})

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
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
    const salt = await bcrypt.genSalt();
    try {
        const encrypted_password = await bcrypt.hash(password, salt);
        const user = await userModel.create({ email, password: encrypted_password, name, profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU" });
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
        console.log(user.cart);
        res.status(200).json({ success: true, user, token });
    } catch (err) {
        const error = errorHandler(err);
        res.status(401).json({ success: false, error });
    }
}

const isLoggedin = async (req, res) => {
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById({ _id: id });
        res.status(200).json({ success: true, user })
    } catch (err) {
        res.status(401).send({ success: false });
    }
}

const googleSignup = async (req, res) => {
    const googleToken = req.headers.authorization.trim().split(' ')[1];
    try {
        const profile = jwt_decode(googleToken);
        const user = await userModel.create({ email: profile.email, name: profile.name, profileImage: profile.picture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU" });
        const token = createToken(user._id)
        res.status(200).json({ success: true, user, token });
    } catch (err) {
        const error = errorHandler(err);
        console.log(err);
        res.status(401).json({ success: false, message: error });
    }
}

const googleLogin = async (req, res) => {
    const googleToken = req.headers.authorization.trim().split(' ')[1];
    try {
        const profile = jwt_decode(googleToken);
        const user = await userModel.findOne({ email: profile.email });
        console.log(user.cart);
        const token = createToken(user._id);
        user.password = undefined;
        res.status(200).json({ success: true, user, token });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ success: false });
    }
}

const changeProfileImage = async (req, res) => {
    const token = req.headers.authorization.trim().split(' ')[1];
    const { image } = req.body;
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.updateOne({ _id: id }, { profileImage: image }, { upsert: false });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
}

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(id);
        if (user) {
            if (await bcrypt.compare(currentPassword, user.password)) {
                await userModel.updateOne({ _id: id }, { password: newPassword }, { upsert: true });
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false })
            }
        } else {
            res.status(400).json({ success: false })
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false })
    }
}

const changeName = async (req, res) => {
    const { name } = req.body;
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.updateOne({ _id: id }, { name });
        if (user) {
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ success: false })
        }
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

const changeEmail = async (req, res) => {
    const { email } = req.body;
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.updateOne({ _id: id }, { email });
        if (user) {
            res.status(200).json({ success: true })
        } else {
            res.status(400).json({ success: false })
        }
    } catch (err) {
        res.status(400).json({ success: false })
    }
}

const cartHandler = async (req, res) => {
    const { cart } = req.body;
    const token = req.headers.authorization.trim().split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.updateOne({ _id: id }, { cart }, { upsert: true });
        if (user) {
            res.status(200).json({ success: true, ...user });
        } else {
            res.status(400).json({ success: false })
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

const payment = async (req, res) => {
    const { amount } = req.body;
    const option = { amount: Number(amount * 100), currency: 'INR' };
    try {
        const order = await instance.orders.create(option)
        res.status(200).json({ succes: true, order });
    } catch (err) {
        console.log(err);
    }
}

const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_APT_SECRET).update(body.toString()).digest('hex')
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
        res.status(200).json({ success: true })
    }else {
        res.status(400).json({ success: false })
    }
}

const getKey = async (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
}

module.exports = {
    signup,
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
}