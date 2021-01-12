import generatePdf from './generate-pdf'
import {Worker} from "bullmq"
import {emailQueue} from "../express/queue/jobs-queue";
import {dbConnect} from "./data-base/db-connect";
const mongoose = require('mongoose')






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
            });
            return;
        }
        console.log('Fail to connect to database');
    })


console.log('generatePdfWorker initialisation');