import {Queue, Worker} from 'bullmq'
import IORedis from 'ioredis'
import generatePdf from '../pdf_generation/generatePdf'
import sendPdf from '../mailing/sendPdf'
import { v4 as uuidv4 } from 'uuid';

const fileName = uuidv4()

const connection = new IORedis();

const myQueue = new Queue('pdf',
    {
        connection
    }
);


async function addJobs(email, description) {
    await myQueue.add('generatePdf', {email, description});
    await myQueue.add('sendPdf', {email});
}


module.exports = addJobs

const worker = new Worker('pdf', async job => {

    if (job.name === 'generatePdf') {
        console.log(job.data);
        await generatePdf(job.data.email, job.data.description, fileName);
    }
    if (job.name === 'sendPdf') {
        await sendPdf(job.data.email, fileName);
        console.log(job.data);
    }
});

worker.on('completed', (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});