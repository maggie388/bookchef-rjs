const express = require('express');
const router = express.Router();
const authorize = require('../utils/authorize');

const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;

const mailer = require('../utils/mailer');
const crypto = require('crypto');  // nodejs built-in package
const SERVER_URL = process.env.SERVER_URL

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

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds)
        .then((hashedPassword) => {
            new Users({
                name,
                email,
                password: hashedPassword
            })
            .save()
            .then((newUser) => {
                crypto.randomBytes(20, (error, buf) => {
                    const token = newUser.id + buf.toString('hex');
                    newUser.save({
                        active_token: token,
                        active_expires: new Date()
                    })
                    .then(updatedUser => {
                        const link = `${SERVER_URL}/account/active/${updatedUser.attributes.active_token}`;
                        mailer({
                            to: updatedUser.attributes.email,
                            subject: 'Welcome',
                            html: 'Link: ' + link
                        })
                        res.status(200).send('new user saved and activation code sent');
                    });
                    
                });
            })
            .catch(error => {
                console.log(error);
            })
        })
});

router.put('/active/:activeToken', (req, res) => {
    const activeToken = req.params.activeToken;
    Users
        .where({active_token: activeToken})
        .fetch()
        .then(user => {
            if (user.attributes.active === 1) {
                console.log('Account is already active.');
                return res.status(200).json({ message: 'This account has already been activated.'});
            }
            if (user.attributes.active_expires < new Date()) {
                // TO DO: delete user from database so they can register again
                console.log('Activation link has expired.')
                return res.status(200).json({ message: 'Your activation link has expired. Please register again.'});
            }
            user.save({
                active: true,
            })
            .then(_savedUser => {
                console.log('Account activated.');
                res.status(200).json({ message: 'Your account has been activated. You can login now.' });
            })
        })
});

module.exports = router;