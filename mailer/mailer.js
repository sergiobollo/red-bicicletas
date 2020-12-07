const nodemailer = require('nodemailer');


const mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kelton.corkery79@ethereal.email',
                pass: 'GED153KmQuKG5ArWtz'
            }
        };

module.exports = nodemailer.createTransport(mailConfig);
