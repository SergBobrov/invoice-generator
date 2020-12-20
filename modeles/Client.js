const {Schema, model} = require('mongoose')

const Client = new Schema(
    {
        email: {
            type: String,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        company: {
            type: String,
        },
    }
)


module.exports = model('client', Client)

