const path = require('path');

const api_key = '1569c701ca9ee1e387143a9c446ee36f-b6190e87-fc3d3453';
const domain = 'sandbox544c165846c04d8fbba5ca2ca85dbb41.mailgun.org';

const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});



const sendPdf = (email, fileName) => {


    const filepath = path.join(__dirname, `../pdf-generation/generated-files/${fileName}.pdf`);

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


