const express = require('express');
const userRouter = require('./routes/User.router.js')
const helmet = require('helmet')
const cors = require('cors');
const productRouter = require('./routes/Product.Router.js');

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(helmet())
app.use(express.json());
app.use('/', userRouter)
app.use('/', productRouter);

module.exports = app;