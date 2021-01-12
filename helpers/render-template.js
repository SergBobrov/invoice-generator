const ejs = require('ejs')

const renderTemplate = (templateName, params) => {
    // return promisify(ejs.renderFile)(`${__dirname}/${templateName}.ejs`, params)

    return new Promise((resolve, reject) => {
        ejs.renderFile(`${__dirname}/templates/${templateName}.ejs`, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = renderTemplate


// TODO
//   fn(a1, a2, cb) ,
//     cb: (err, result)
// function promisify(fn) {
//     return (...args) => {
//         return new Promise((resolve, reject) => {
//             fn(...args, (err, result) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     resolve(result)
//                 }
//             })
//         })
//     }
// }