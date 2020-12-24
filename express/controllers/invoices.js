import {addJobs} from "../../pdf_generation/generatePdfWorker";
const Client = require('../../modeles/Client')
const {validationResult} = require('express-validator')
const Invoice_data = require('../../modeles/InvoiceSchema')
import { v4 as uuidv4} from 'uuid';


export const createInvoice = (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong email or description'
            })
        }

        const {email, description} = req.body

        const isEmailExist = Client.findOne({email})
        if (!isEmailExist) {
            return res.status(400).json({message: 'Mail not found'})
        }

        const initInvoiceData = new Invoice_data({
            email: email,
            description: description,
        })

        try {
            initInvoiceData.save()
        } catch (e) {
            res.status(502).json({message: 'DataBase error'})
            console.log(e);
        }

        try {
            const id = uuidv4()
            addJobs(email, description, id)
        } catch (e) {
            res.status(503).json({message: 'Pdf generation error'})
            console.log(`'Pdf generation error': ${e}`);
        }

        res.status(201).json({message: 'Invoice data received'})

    } catch (e) {
        res.status(500).json({message: "Something wrong, try one more time"})
    }
}

