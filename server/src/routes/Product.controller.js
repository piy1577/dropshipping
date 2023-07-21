const productModel = require('../model/Product.model.js')

const errorHander = (err) => {
    let error = "";
    if (err.code === 11000) {
        error = "Product Name exists try another"
        return error;
    }
}

const product_post = async (req, res) => {
    const { name, price, description, image } = req.body;
    try {
        const product = await productModel.create({ name, price, description, image });
        res.status(200).json(product._id)
    } catch (err) {
        console.log(err);
        const error = errorHander(err);
        res.status(400).json(error)
    }
}

const productid_get = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        if (!product) {
            throw new Error('product doesnt exist');
        }
        res.status(200).json(product);
    }
    catch (err) {
        res.status(400).json(err.message);
    }
}

const product_get = async (req, res) => {
    res.status(200).json(["64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9", "64b40120f3269e764d06c2b9"])
}

module.exports = {
    product_post,
    productid_get,
    product_get
}