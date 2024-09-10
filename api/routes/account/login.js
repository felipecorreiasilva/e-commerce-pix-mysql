const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const {compare} = require('bcrypt');

router.post('/', async(req, res) => {

    const {email, password} = req.body
    const sql = 'SELECT * FROM users WHERE email = ?'
    

    db.query(sql,[email], async(err, userData) => {
        if (err) return res.json("Error")
            if (userData.length > 0){
                
                const validPassword = await compare(password, userData[0].password);
                console.log(validPassword)
                if (!validPassword){
                    return res.json({msgLoggedIn: "Senha inválida", loggedIn: false})
                }else {
                    res.json({msgLoggedIn: 'Usuário logado com sucesso', userData: userData[0], loggedIn: true})

                }
                
    
            }else{
                return res.json({msgLoggedIn: "Não foi possivel encontrar o usuário", loggedIn: false})
            }
        
    })
})

module.exports = router
