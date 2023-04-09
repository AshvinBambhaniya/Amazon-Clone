require('dotenv').config();
const connectMongo = require('./database')
const express = require('express')
var cors = require('cors')
// const DefaultData = require("./defaultdata");

connectMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authenticate'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/product', require('./routes/products'))


if (process.env.NODE_ENV == "production") {
    app.use(express.static("../client/build"));
}

app.listen(port, () => {
    console.log(`App listening on at http://localhost:${port}`)
})

// DefaultData();