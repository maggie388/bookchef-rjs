const express = require('express');
const router = express.Router();

const Users = require('../models/users');

// ENVIRONMENT VARIABLES
// require('dotenv').config();
const SERVER_URL = process.env.SERVER_URL

// BCRYPT CONFIG
const bcrypt = require('bcrypt');
const saltRounds = 10;

// NODEMAILER CONFIG
const mailer = require('../utils/mailer');
const crypto = require('crypto'); // nodejs built-in package

// ROUTES
router.post('/', (req, res) => {
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


module.exports = router;