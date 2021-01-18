const {Schema, model} = require('mongoose')

const InvoiceSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        description : [{
            title : String,
            price : String
        }]
    }
)

module.exports = model('invoice_data', InvoiceSchema)


