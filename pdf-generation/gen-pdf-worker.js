import Redis from "ioredis";
import {Queue} from "bullmq";
import generatePdf from './generate-pdf'
import {Worker} from "bullmq"
import {dbConnect} from "./data-base/db-connect";
import * as redis from "redis";

const connection = new Redis(6379, "redis")


export const emailQueue = new Queue('email',
    {
        connection
    }
);

dbConnect()
    .then(res => {
        if (res.connection.readyState !== 0) {
            const generatePdfWorker = new Worker('pdf', async job => {
                console.log('generatePdfWorker: new job', job.name);
                const {email, description, id: fileName} = job.data
                await generatePdf(email, description, fileName);
                await emailQueue.add('sendPdf', {email, fileName});

                generatePdfWorker.on('failed', (job, err) => {
                    console.log(`${job.id} has failed with ${err.message}`);
                });
            }, {
                connection
            });
            return;
        }
        console.log('Fail to connect to database');
    })


console.log('generatePdfWorker initialisation');