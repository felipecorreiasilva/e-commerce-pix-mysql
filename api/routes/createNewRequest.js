const express = require('express')
const router = express.Router()
const { db } = require('../db');

router.post('/', async(req,res)=>{

    const q = "INSERT INTO `newrequest` (`id` ,`adresses`, `cep`,  `city`, `cityComplement`, `country`, `deliveryMethod`, `emailContact`, `firstname`, `lastname`,  `houseNumber`, `cpf`, `phone`, `neighborhood`, `paymentMethod`, `pixCopiaECola`, `txid`, `uf`) VALUES (?)"
    
    const values = [
        req.body.id,
        req.body.adresses,
        req.body.cep,
        req.body.city,
        req.body.cityComplement,
        req.body.country,
        req.body.deliveryMethod,
        req.body.emailContact,
        req.body.firstname,
        req.body.lastname,
        req.body.houseNumber,
        req.body.cpf,
        req.body.phone,
        req.body.neighborhood,
        req.body.paymentMethod,
        req.body.pixCopiaECola,
        req.body.txid,
        req.body.uf
    ]
    
    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })

})

module.exports = router