const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI;

const connectMongo = ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectMongo;