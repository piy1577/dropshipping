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


userModel.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        if (user.password === null) {
            throw new Error('Use signin with google');
        }
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