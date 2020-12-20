const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const main = require('./routes/main.routes');

const app = express()

app.use(express.json({inflate: true}))

app.use('/api', main)

const PORT = config.get('port') || 5000

async function start() {
    try {

        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
    }
}

start()



