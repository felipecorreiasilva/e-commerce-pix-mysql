const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const {compare} = require('bcrypt');
const {sign} = require('jsonwebtoken')

router.post('/', async(req, res) => {

    const {email, password} = req.body
    const sql = 'SELECT * FROM users WHERE email = ?'
    

    db.query(sql,[email], async(err, userData) => {
        if (err) return res.json("Error")
            if (userData.length > 0){
                
                const validPassword = await compare(password, userData[0].password);
                if (!validPassword){
                    return res.json({msgLoggedIn: "Usuário ou senha inválido", loggedIn: false})
                }else {
                    const userId = userData[0].id
                    
                    let token = sign({id:userId}, process.env.AUTH_SECRET_JWT)
                    res.json({msgLoggedIn: 'Usuário logado com sucesso', loggedIn: true, token})

                }
                
    
            }else{
                return res.json({msgLoggedIn: "Não foi possivel encontrar o usuário", loggedIn: false})
            }
        
    })
})

module.exports = router
