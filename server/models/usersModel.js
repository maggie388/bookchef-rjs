const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const crypto = require('crypto');  // Node.js built-in package

// UTILS
const mailer = require('../utils/mailer');
const { activationEmail, alreadyRegistered } = require('../utils/email');

// VARIABLES
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;
const APP_URL = process.env.APP_URL;

// DATA
const Users = require('../models/users');

// MODEL FUNCTIONS
const handleUserRegistration = (req) => {
    const { name, email, password } = req.body;
    // Check if email is already in the database
    return Users
        .where({ email })
        .fetch({ require: false })
        .then(async (user) => {
            // If email exists and is active, send an email to let user know and send response
            if (user && user.attributes.active === 1) {
                mailer({
                    to: user.attributes.email,
                    subject: 'You are Already Registered',
                    html: alreadyRegistered(user.attributes.name)
                })
                return { status: 'active' }
            }
            // If email exists, is not active, and token is not expired, resend activation email and send response
            if (user && user.attributes.active === 0 && user.attributes.active_expires > new Date()) {
                const link = `${APP_URL}/activate/${user.attributes.active_token}`;
                mailer({
                    to: user.attributes.email,
                    subject: 'Activate your Account',
                    html: activationEmail(link)
                })
                return { status: 'not activated' }
            }
            // If email exists, is not active, and token is expired, delete user and continue
            if (user && user.attributes.active === 0 && user.attributes.active_expires < new Date()) {
                user.destroy();
            }
            // Save new user and send activation email
            const hashedPassword = await bcrypt.hash(password, saltRounds).then((result) => result);
            return new Users({
                name,
                email, 
                password: hashedPassword
            })
            .save()
            .then((newUser) => {
                const date = new Date();
                date.setDate(date.getDate() + 1 );
                const buffer = crypto.randomBytes(20)
                const token = newUser.id + buffer.toString('hex');
                return newUser.save({
                    active_token: token,
                    active_expires: date
                })
                .then((updatedUser)=> {
                    const link = `${APP_URL}/activate/${updatedUser.attributes.active_token}`;
                        mailer({
                            to: updatedUser.attributes.email,
                            subject: 'Activate your Account',
                            html: activationEmail(link)
                        })
                        return { status: 'created' }
                })
                .catch(console.log);
            })
        });
}

const handleAccountActivation = (req) => {
    const activeToken = req.params.activeToken;
    return Users
        .where({active_token: activeToken})
        .fetch({require: false})
        .then(user => {
            if (!user) {
                return {status: 'invalid'};
            }
            if (user.attributes.active === 1) {
                return {status: 'active'}
            }
            if (user.attributes.active_expires < new Date()) {
                user.destroy();
                return {status: 'expired'}
            }
            return user.save({
                active: true,
            })
            .then(_savedUser => {
                return {status: 'activated'}
            })
        })
}

const handleUserLogin = (req) => {
    const { email, password } = req.body;
    return Users
        .where({ email })
        .fetch({require: false})
        .then(user => {
            if (!user) {
                return { status: 'not found' };
            }
            if (user.attributes.active === 0) {
                // TO DO IN NEXT PHASE: Resend activation email here
                return { status: 'not activated' };
            }
            const { attributes } = user;
            return bcrypt.compare(password, attributes.password).then((isValid) => {
                // TO DO IN NEXT PHASE: check for expiry and make user sign in again if needed
                if (isValid) {
                    const token = jwt.sign({
                        userId: attributes.id,
                        exp: Date.now() + 7200000
                    }, JWT_SECRET);
                    return { status: 'active', token };
                }
                return { status: 'failed' };
            })
            .catch(console.log);         })
        .catch(error => console.log(error));
}

// EXPORTS
module.exports = {
    handleUserRegistration,
    handleAccountActivation,
    handleUserLogin
}