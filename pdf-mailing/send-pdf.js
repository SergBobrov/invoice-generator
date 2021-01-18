const path = require('path');

const api_key = 'ac8766140bd31b4fb0e223be2430eece-28d78af2-b4521375';
const domain = 'sandbox4e9c8f648c81492a8a5eab171850c983.mailgun.org';

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});



const sendPdf = (email, fileName) => {


    const filepath = path.join(__dirname, `../pdf-generation/generated-files/${fileName}.pdf`);

    const data = {
        from: 'Margaret Brick <me@samples.mailgun.org>',
           to: email,
        subject: 'Invoice',
        text: 'Invoice generated successful!',
        attachment: filepath
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}
module.exports = sendPdf;


