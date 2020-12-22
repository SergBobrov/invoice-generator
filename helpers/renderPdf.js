const htmlPdf = require('html-pdf');

const renderPdf = (htmlContent, options, toFilename) => {
    // return promisify(htmlPdf.create)(`${__dirname}/${templateName}.ejs`, params)
    return new Promise((resolve, reject) => {
        htmlPdf.create(htmlContent, options).toFile(toFilename, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        });
    })
}

module.exports = renderPdf