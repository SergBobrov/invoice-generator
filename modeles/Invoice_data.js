const {Schema, model, Types} = require('mongoose')

const Invoice_data = new Schema(
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

module.exports = model('invoice_data', Invoice_data)


