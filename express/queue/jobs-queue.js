import Redis from "ioredis";

import {Queue} from "bullmq";

const connection = new Redis(6379, "redis")

export const pdfQueue = new Queue('pdf',
    {
        connection
    });

export function addJobs(email, description, id) {
    pdfQueue.add('generatePdf', {email, description, id}); // 5 sec
}


console.log('addToQueue initialisation');