const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        validate: [validator.isEmail, 'Email is not validate'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    cart: {
        type: [mongoose.Schema.ObjectId],
        default: [],
    },
    profileImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU",
    },
    name: {
        type: String,
    }
})

userModel.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userModel.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            throw new Error('invalid password');
        }
    } else {
        throw new Error('invalid Email');
    }
}


module.exports = mongoose.model('user', userModel);