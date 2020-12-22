const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()
const {createInvoice} = require('../controllers/invoices')



// /api/invoice
router.post('/invoice',
    [
        check('email', 'Wrong email').isEmail(),
        check('description', 'No description').exists()
    ],
    createInvoice
)

module.exports = router

