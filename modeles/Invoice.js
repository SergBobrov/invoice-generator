// const { v4: uuid4 } = require('uuid')
// const fs = require('fs')
// const path = require('path')
//
// class Invoice {
//     constructor(email, description) {
//         this.email = email
//         this.description = description
//         this.id = uuid4()
//     }
//
//     toJSON() {
//         return {
//             email: this.email,
//             description: this.description,
//             id: this.id
//         }
//     }
//
//     async save() {
//         const invoices = await Invoice.getAll()
//         invoices.push(this.toJSON())
//         console.log(invoices);
//
//
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'invoices.json'),
//                 JSON.stringify(invoices),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }
//
//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'invoices.json'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve(JSON.parse(content))
//                     }
//                 }
//             )
//         })
//     }
// }
//
//
//
// module.exports = Invoice



