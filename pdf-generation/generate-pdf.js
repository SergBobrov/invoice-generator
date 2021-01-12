const Client = require('../modeles/Client')
const renderPdf = require('../helpers/render-pdf')
const currentDate = require('../helpers/current-date')
const renderTemplate = require('../helpers/render-template')


const generatePdf = (email, description, fileName) => {
    console.log("generatePdf");
    console.log(email);
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
                const resultFileName = __dirname + `/generated-files/${fileName}.pdf`;
                return renderPdf(html, options, resultFileName);
            });
};

module.exports = generatePdf;
