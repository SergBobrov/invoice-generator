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
            const {id, name, company} = data
            const price = description.reduce((accumulator, item) => {
                return accumulator + Number(item.price)
            }, 0)
            return {
                id,
                name,
                email,
                company,
                description,
                price,
                logo: "logo.png",
                date: currentDate(),
            }
        })
        .then(params => {
            return renderTemplate('template', params)
        })
        .then((html) => {
            const options = {
                format: 'A4',
                base: 'file:///' + __dirname + '/images/'
            };
            const resultFileName = __dirname + `/generatedFiles/${fileName}.pdf`;
            return renderPdf(html, options, resultFileName);
        });
};

module.exports = generatePdf;
