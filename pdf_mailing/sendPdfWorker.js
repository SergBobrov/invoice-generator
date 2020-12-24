const {Worker} = require('bullmq')
const sendPdf = require('./sendPdf')

// export const sendEmail = () => {
//
// const sendPdfWorker = new Worker('email', async job => {
//     console.log('Worker2: sendEmailWorker job', job.name);
//     const {email, fileName} = job.data;
//     await sendPdf(email, fileName);
// });
//
// sendPdfWorker.on('failed', (job, err) => {
//     console.log(`${job.id} has failed with ${err.message}`);
// });
// }


    const sendPdfWorker = new Worker('email', async job => {
        console.log('Worker2: sendEmailWorker job', job.name);
        const {email, fileName} = job.data;
        await sendPdf(email, fileName);
    });

    sendPdfWorker.on('failed', (job, err) => {
        console.log(`${job.id} has failed with ${err.message}`);
    });


console.log('sendEmailWorker initialisation');
