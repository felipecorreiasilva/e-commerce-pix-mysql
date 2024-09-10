const express = require('express')
const router = express.Router()
const { db } = require('../../db');

router.get('/:id', async(req, res) => {

    const q = "SELECT * FROM users WHERE ID=?"
    const values = req.params.id

    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })
})

module.exports = router
