const mongoose = require('mongoose')

const mongoURI = process.env.DATABASE

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongoose Successfully")
    })
}

module.exports = connectToMongo;