const mongoose = require('mongoose');

const ProductModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, "Product name exists try another"],
        lowercase: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    }
})

module.exports = mongoose.model('product', ProductModel);