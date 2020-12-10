const express = require('express');
const router = express.Router();

const Users = require('../models/users');

// OTHER PACKAGES
require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

router.post('/', (req, res) => {
    const { username, password } = req.body;
    Users
        .where({ username })
        .fetch()
        .then(user => {
            if (!user) {
                return res.status(403).json({error: 'User not found.'})
            }
            if (user.password !== password) {
                return res.status(403).json({ error: 'Incorrect password.' })
            }
            // token expires after 20s for testing purposes
            const token = jwt.sign({
                username,
                exp: Date.now() + 20000
            }, JWT_SECRET);
            return res.status(200).json({ success: true, token })
        })
        .catch(error => console.log(error));
});

module.exports = router;