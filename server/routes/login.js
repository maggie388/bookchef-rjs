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


// TO DO IN NEXT PHASE: Create sign-up page, use this function to create password hash
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
                // the json object in the response is being ignored
                // once the client sees the 403 response status it enters the catch statement on the front end
                // 'error.message' is not the one i'm sending here
                // also tried error.data and error.data.error and error.error
                return res.status(403).json({ error: 'User not found.' })
            }
            const { attributes } = user;
            bcrypt.compare(password, attributes.password, function(err, isValid) {
                // TO DO IN NEXT PHASE: check for expiry and make user sign in again if needed
                if (isValid) {
                    const token = jwt.sign({
                        username,
                        userId: attributes.id,
                        exp: Date.now() + 7200000
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