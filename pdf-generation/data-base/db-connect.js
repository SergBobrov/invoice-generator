const mongoose = require('mongoose')

export const dbConnect = () => {
    return mongoose.connect('mongodb+srv://Sergg:dev23392@cluster0.aqiff.mongodb.net/invoice_generator', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}