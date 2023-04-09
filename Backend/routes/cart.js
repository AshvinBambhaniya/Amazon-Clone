const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const products = require('../models/productsSchema')
const cartProduct = require('../models/cartproduct')
const { body, validationResult } = require('express-validator');

router.get('/cartdetails', fetchuser, async (req, res) => {
    try {
        const cartp = await cartProduct.find({ user: req.user.id })
        res.status(201).send(cartp)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addcart/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await products.findOne({ id: id })
        if (!cart) {
            return res.status(404).send("Not Found")
        }

        const cartp = new cartProduct({
            id: cart.id,
            url: cart.url,
            detailUrl: cart.detailUrl,
            title: cart.title,
            price: cart.price,
            description: cart.description,
            discount: cart.discount,
            tagline: cart.tagline,
            user: req.user.id
        })

        const savedCartp = await cartp.save();

        res.status(201).json(savedCartp)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.delete('/remove/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        let cart = await cartProduct.findById(id)
        if (!cart) {
            return res.status(400).send("Not Found")
        }

        if (cart.user.toString() != req.user.id) {
            return res.status(400).send("Not Allowed");
        }

        cart = await cartProduct.findByIdAndDelete(id);
        res.status(201).json({ "Success": "Note has been deleted", cart: cart });

    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal Server Error");
    }
})

module.exports = router;