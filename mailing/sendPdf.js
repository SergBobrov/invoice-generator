const path = require('path');

const api_key = 'cc4b1828f9a725192d6facccaf6b7f09-b6190e87-99402610';
const domain = 'sandbox1bc455121088456e8016390b49e8af4c.mailgun.org';

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


