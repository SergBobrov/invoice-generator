const mongoose = require('mongoose')

// const atlas = 'mongodb+srv://Sergg:dev23392@cluster0.aqiff.mongodb.net/invoice_generator'
const local = 'mongodb://mongo:27017/invoice_generator'

export const dbConnect = () => {
    return mongoose.connect(local, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}