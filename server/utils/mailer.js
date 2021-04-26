const _ = require('lodash');
const nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;

const config = {
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: `${EMAIL}`,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
};

const transporter = nodemailer.createTransport(config);

const defaultMail = {
    from: `Bookchef <${EMAIL}>`,
    text: 'Bookchef: Action is Required on your Account'
};

module.exports = function(mail) {
    // use default settings
    mail = _.merge({}, defaultMail, mail);

    // send email
    transporter.sendMail(mail, (error, info) => {
        if (error) return console.log(error);
        console.log('mail sent: ', info.response);
    });
}; 