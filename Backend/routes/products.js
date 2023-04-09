const express = require('express')
const router = express.Router()
const products = require('../models/productsSchema')

router.get('/getproducts', async (req, res) => {
    try {
        const producstdata = await products.find()
        res.status(201).json(producstdata)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/getproductsone/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productdata = await products.findOne({ id: id })
        // if (!productdata) {
        //     return res.status(404).send("Not Found")
        // }
        res.status(201).json(productdata)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;