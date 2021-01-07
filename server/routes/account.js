const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const Users = require('../models/users');

// ROUTES
router.get('/:userId', authorize, (req, res) => {
    // TO DO: connect with profile page when built
    res.status(200).send('Get account by user ID request received');
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    Users
        .where({ email })
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