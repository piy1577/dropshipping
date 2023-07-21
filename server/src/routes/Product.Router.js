const { Router } = require('express');
const { product_post, productid_get, product_get } = require('./Product.controller');

const productRouter = Router();

productRouter.post('/', product_post);
productRouter.get('/', product_get);
productRouter.get('/:id', productid_get);
productRouter.get('/search');

module.exports = productRouter