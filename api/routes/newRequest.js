const express = require('express')
const router = express.Router()
const { db } = require('../db');
const { createPixCharge } = require('../lib/pix.js')

router.post('/', async(req, res) => {
    const pixCharge = await createPixCharge(req.body)
    const {qrcode, cobranca} = pixCharge;
    return res.send({ ok: 1, qrcode, cobranca })
})

router.get('/v2/loc/:id/qrcode', async(req, res) => {

    const q = "SELECT * FROM newrequest WHERE ID=?"
    const values = req.params.id

    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })
})

module.exports = router
