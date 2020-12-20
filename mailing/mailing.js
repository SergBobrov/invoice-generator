const path = require('path');

const api_key = 'e8b6f87b6798f3dea4dd014f85d04016-e5da0167-ee78be0a';
const domain = 'sandboxa9e2ad8aabc640e69e032299f8006b06.mailgun.org';

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const filepath = path.join(__dirname, '../pdf_generation/file.pdf');

const sendPdf = (email) => {
    console.log(email);
    const data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!',
        attachment: filepath
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}

module.exports = sendPdf;


