const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Invoice_data = require('../modeles/Invoice_data')
const Client = require('../modeles/Client')
const router = Router()
const generatePdf = require('../pdf_generation/html_to_pdf')

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
                await generatePdf(req.body)
            } catch (e) {
                res.status(502).json({message: 'Pdf generation error'})
                console.log(`'Pdf generation error': ${e}`);
            }
            // const invoice = new Invoice(email, description)
            //
            // await invoice.save()

            res.status(201).json({message: 'Invoice data received'})

        } catch (e) {
            res.status(500).json({message: "Something wrong, try one more time"})
        }
    })

module.exports = router

