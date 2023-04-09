const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', [
    body('fname', 'Enter a valid name').isLength({ min: 3 }),
    body('mobile', 'Enter a valid number').isLength({ min: 10 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(422).json({ success, error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            fname: req.body.fname,
            mobile: req.body.mobile,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)

        success = true;
        res.status(201).json({ success, authtoken })

    } catch (error) {
        console.log(error.message);
        res.status(422).send("Internal Server Error")
    }
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true

        res.status(201).json({ user, authtoken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

router.get('/validuser', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;