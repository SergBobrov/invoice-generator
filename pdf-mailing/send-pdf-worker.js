import Redis from "ioredis";
const {Worker} = require('bullmq')
const sendPdf = require('./send-pdf')

const connection = new Redis(6379, "redis")

const sendPdfWorker = new Worker('email', async job => {
    console.log('Worker2: sendEmailWorker job', job.name);
    const {email, fileName} = job.data;
    await sendPdf(email, fileName);
}, {connection});

sendPdfWorker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});


console.log('sendPdfWorker initialisation');