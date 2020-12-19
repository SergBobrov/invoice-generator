const {Schema, model, Types} = require('mongoose')

const invoice_data = new Schema(
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

module.exports = model('invoice_data', invoice_data)
