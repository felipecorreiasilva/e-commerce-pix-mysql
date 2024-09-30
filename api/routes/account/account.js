const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const {authMiddleware} = require('./middlewares/auth')

router.get('/', authMiddleware, async(req, res) => {

    const q = "SELECT * FROM users WHERE ID=?"
    const values = req.loggedUserId

    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data[0])

    })
})

module.exports = router
