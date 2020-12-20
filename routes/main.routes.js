const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Invoice_data = require('../modeles/Invoice_data')
const Client = require('../modeles/Client')
const router = Router()
const generatePdf = require('../pdf_generation/html_to_pdf')
const sendPdf = require('../mailing/mailing')


// /api/invoice
router.post('/invoice',
    [
        check('email', 'Wrong email').isEmail(),
        check('description', 'No description').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong email or description'
                })
            }

            const {email, description} = req.body

            const isEmailExist = await Client.findOne({email})


            if (!isEmailExist) {
                return res.status(400).json({message: 'Mail not found'})
            }


            const initInvoiceData = new Invoice_data({
                email: email,
                description: description,
            })

            try {
                await initInvoiceData.save()
            } catch (e) {
                res.status(502).json({message: 'DataBase error'})
                console.log(e);
            }

            try {
                new Promise((resolve) => {
                        generatePdf(req.body)
                        resolve()
                    }
                ).then(() => {
                    setTimeout(() => {
                        sendPdf(email)
                    }, 15000)

                })
            } catch (e) {
                res.status(503).json({message: 'Pdf generation error'})
                console.log(`'Pdf generation error': ${e}`);
            }

            // try {
            //     console.log(email);
            //     await sendPdf(email)
            // } catch (e) {
            //     res.status(504).json({message: 'Sending error'})
            //     console.log(`'Sending error': ${e}`);
            // }


            // const invoice = new Invoice(email, description)
            //
            // await invoice.save()

            res.status(201).json({message: 'Invoice data received'})

        } catch (e) {
            res.status(500).json({message: "Something wrong, try one more time"})
        }
    })

module.exports = router

