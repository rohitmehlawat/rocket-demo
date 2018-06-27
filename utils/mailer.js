const nodemailer = require('nodemailer');
const config = require('../config/conf');
const logger = require('../utils/logger');

var mailer = {};

mailer.sendMail = sendMail;

function sendMail(recievers, mailSubject, mailBody) {
    // const transporter = nodemailer.createTransport({
    //     service: config.get('mail.service'),
    //     host: config.get('mail.host'),
    //     auth: {
    //         user: config.get('mail.username'),
    //         password: config.get('mail.password')
    //     }
    // });

    const transporter = nodemailer.createTransport({
        service: config.get('mail.fromEmail'),
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            clientId: '3XXXXXX-XXXXXXXX.apps.googleusercontent.com',
            clientSecret: 'XXXXXX-XXXXXX'
        }
    });

    transporter.sendMail({
        from: config.get('mail.fromEmail'),
        to: recievers,
        subject: mailSubject,
        html: mailBody,
        auth: {
            user: config.get('mail.fromEmail'),
            refreshToken: '1/XXXXXXXX',
            accessToken: 'ya29.XXXXXX-XXXXXX-XXXXXX',
        }
    }, function (error, info) {
        if (error) {
            logger.log('error', 'An error occured while sending mail with error : ' + error);
        }
        if(info){
            logger.log('info', 'It seems mail to ' + recievers + ' has been sent successfully with info : ' + JSON.stringify(info));
        }
    })

}

module.exports = mailer;