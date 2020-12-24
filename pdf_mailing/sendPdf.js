const path = require('path');

const api_key = '';
const domain = '';

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});



const sendPdf = (email, fileName) => {


    const filepath = path.join(__dirname, `../pdf_generation/generatedFiles/${fileName}.pdf`);

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


