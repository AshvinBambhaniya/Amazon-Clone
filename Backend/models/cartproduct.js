const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartproductSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    description: String,
    discount: String,
    tagline: String
})

module.exports = mongoose.model('cartproduct',cartproductSchema);