const ejs = require('ejs');
const Client = require('../modeles/Client')
const renderPdf = require('../helpers/renderPdf')
const currentDate = require('../helpers/currentDate')
const renderTemplate = require('../helpers/renderTemplate')

const generatePdf = (email, description, fileName) => {
    return Client.findOne({email})
        .then(clientInfo => {
            return {
                name: `${clientInfo.firstName} ${clientInfo.lastName}`,
                company: clientInfo.company,
                id: clientInfo.id,
            }
        })
        .then((data) => {
            const {name, id, company} = data
            return {
                name,
                email,
                id,
                company,
                logo: "/images/logo.png",
                date: currentDate(),
                quantity: 1,
                price: description[0].price,
                currency: "BTC",
                product: description[0].title,
                units: "штука"
            }
        })
        .then(params => {
            return renderTemplate('template', params)
        })
        .then((html) => {
            const options = {format: 'A4'};
            const resultFileName = __dirname + `/generatedFiles/${fileName}.pdf`;
            return renderPdf(html, options, resultFileName);
        });
};

module.exports = generatePdf;
