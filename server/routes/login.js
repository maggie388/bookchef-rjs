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

const createHashPassword = (plaintext) => {
    bcrypt.hash(plaintext, saltRounds, function(_err, hash) {
        console.log('hash :: ', hash);
    });
};

// ROUTES
router.post('/', (req, res) => {
    const { username, password } = req.body;
    Users
        .where({ username })
        .fetch({require: false})
        .then(async user => {
            if (!user) {
                // the json object is being ignored
                // once the client sees the 403 status response it enters the catch statement on the front end
                // error.message is not the one i'm sending here
                // also tried error.data and error.data.error and error.error
                return res.status(403).json({ error: 'User not found.' })
            }
            const { attributes } = user;
            bcrypt.compare(password, attributes.password, function(err, isValid) {
                if (isValid) {
                    // token expires after 20s for testing purposes
                    const token = jwt.sign({
                        username,
                        userId: attributes.id,
                        exp: Date.now() + 20000
                    }, JWT_SECRET);
                    return res.status(200).json({ success: true, token })
                }
                // same as above happening here
                return res.status(403).json({ error: 'Incorrect password.' })
            })
        })
        .catch(error => console.log(error));
});

module.exports = router;