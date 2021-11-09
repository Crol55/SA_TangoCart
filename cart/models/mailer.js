const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'sa.usac.mail@gmail.com',
        pass: '6bJq2q44LHubpCJ'
    }
});

transporter.verify().then(() =>{
    console.log('Ready for send emails!');
});

module.exports = {
    transporter: transporter
}