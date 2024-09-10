const express = require('express')
const router = express.Router()
const { calcFrete } = require('../lib/frete.js')

router.post('/', async(req,res)=>{

    const frete = await calcFrete(req.body)
    return res.json(frete.data)

})

module.exports = router
