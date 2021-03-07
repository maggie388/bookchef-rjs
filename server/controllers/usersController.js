// MODEL FUNCTIONS
const usersModel = require('../models/usersModel');

// CONTROLLER FUNCTIONS
const handleUserRegistration = async (req, res) => {
    const data = await usersModel.handleUserRegistration(req);
    if (data.status === 'active') return res.status(200).json({ success: true });
    if (data.status === 'not activated') return res.status(200).json({ success: true });
    if (data.status === 'created') return res.status(200).send('new user saved and activation code sent');
}

const handleAccountActivation = async (req, res) => {
    const data = await usersModel.handleAccountActivation(req);
    if (data.status === 'invalid') return res.status(200).json({ message: 'This activation link is not valid. Please register again.'});
    if (data.status === 'active') return res.status(200).json({ message: 'This account has already been activated.'});
    if (data.status === 'expired') return res.status(200).json({ message: 'Your activation link has expired. Please register again.'});
    if (data.status === 'activated') return res.status(200).json({ message: 'Your account has been activated. You can login now.' });
}

const handleUserLogin = async (req, res) => {
    const data = await usersModel.handleUserLogin(req);
    // The json object in the response is being ignored
    // Once the client sees the 403 response status it enters the catch statement on the front end
    if (data.status === 'not found') return res.status(403).json({ error: 'User not found.' });
    if (data.status === 'not activated') return res.status(200).send('Account has not been activated');
    if (data.status === 'active') return res.status(200).json({ success: true, token: data.token });
    // Same as above happening here
    if (data.status === 'failed') return res.status(403).json({ error: 'Incorrect password.' });
}

// EXPORTS
module.exports = {
    handleUserRegistration,
    handleAccountActivation,
    handleUserLogin
}