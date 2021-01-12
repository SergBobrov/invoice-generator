import IORedis from "ioredis";
import {Queue} from "bullmq";

const connection = new IORedis();

export const emailQueue = new Queue('email',
    {connection}
);

export const pdfQueue = new Queue('pdf',
    {connection}
);

export function addJobs(email, description, id) {
    pdfQueue.add('generatePdf', {email, description, id}); // 5 sec
}


console.log('addToQueue initialisation');