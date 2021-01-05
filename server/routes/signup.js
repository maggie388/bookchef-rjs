const express = require('express');
const router = express.Router();

const Users = require('../models/users');

// OTHER PACKAGES
require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

// BCRYPT CONFIG
const bcrypt = require('bcrypt');
const saltRounds = 10;

// ROUTES
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds)
        .then((result) => {
            new Users({
                name,
                email,
                password: result
            })
            .save()
            .then((user) => {
                res.status(200).send('new user saved');
            })
            .catch(error => {
                console.log(error);
            })
        })
});


module.exports = router;