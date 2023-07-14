const http = require('http')
const mongoose = require('mongoose')
require('dotenv').config();
const app = require('./src/app.js')

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const uri = process.env.MONGO_URL.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connection.once('open', () => {
    console.log('DB connected');
})

mongoose.connection.on('error', err => {
    console.log(err);
})

mongoose.connect(uri).then(() => server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
}))