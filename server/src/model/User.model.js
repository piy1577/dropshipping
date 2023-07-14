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
    }
})

userModel.pre('save', async (next) => {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


module.exports = mongoose.model('user', userModel);