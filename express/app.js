const express = require('express')
const mongoose = require('mongoose')
const main = require('./routes/main.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const options = {
    explorer: true
};

const app = express()

app.use(express.static("public"));

app.use(express.json({inflate: true}))

app.use('/api', main)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


const PORT = 5000

mongoose.connect('mongodb+srv://Sergg:dev23392@cluster0.aqiff.mongodb.net/invoice_generator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(res => {
        if (res.connection.readyState !== 0) {
            app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
            return;
        }
        console.log('Fail to connect to database');
    })
    .catch(err => {
        console.log('mongoDB was not connect ', err);
    });


console.log('app1 initialisation');
