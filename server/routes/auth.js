require('dotenv').config();

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validateRegister = require('../middlewares/validator');


router.post('/register', async (req, res) => {
    let status = 200;
    try {
        const err = validateRegister(req.body);
        if (err) {
            throw err;
        }

        const {email, firstname, lastname, password} = req.body;
        const hash = await bcrypt.hash(password, 8);
        const newUser = new User({lastname, firstname, email, password: hash});
        await newUser.save();
        
        res.status(status).send(newUser);
    } catch (err) {
        status = 401;
        res.status(status).send(err);
    }
});

router.post('/login', async (req, res) => {
    let status = 200;
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email});
        
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET);
            res.status(status).send(token);
        } else {
            status = 401;
            res.status(status).send("Wrong credentials!");
        }
    } catch (err) {
        status = 401;
        res.status(status).send(err);
    }
});

module.exports = router;