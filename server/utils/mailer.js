const _ = require('lodash');
const nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS;

const config = {
    service: 'Gmail',
    auth: {
        user: `${EMAIL}`,
        pass: `${EMAIL_PASS}`
    }
};

const transporter = nodemailer.createTransport(config);

const defaultMail = {
    from: `Bookchef <${EMAIL}>`,
    text: 'Bookchef: Action is Required or your Account'
};

module.exports = function(mail) {
    // use default settings
    mail = _.merge({}, defaultMail, mail);

    // send email
    transporter.sendMail(mail, (error, info) => {
        if (error) return console.log(error);
        // console.log('mail sent: ', info.response);
    });
};