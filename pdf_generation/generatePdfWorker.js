import {Queue, Worker} from 'bullmq'
import IORedis from 'ioredis'
import generatePdf from './generatePdf'
// import {sendEmail} from "../pdf_mailing/sendPdfWorker";



const connection = new IORedis();

export const pdfQueue = new Queue('pdf',
    {connection}
);

export async function addJobs(email, description, id) {
    await pdfQueue.add('generatePdf', {email, description, id}); // 5 sec
}

export const emailQueue = new Queue('email',
    {connection}
);

const generatePdfWorker = new Worker(pdfQueue.name, async job => {
    console.log('generatePdfWorker: new job', job.name);
    const {email, description, id: fileName} = job.data
    await generatePdf(email, description, fileName);
    await emailQueue.add('sendPdf', {email, fileName});
    // sendEmail()
});

generatePdfWorker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

console.log('generatePdfWorker initialisation');
