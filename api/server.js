require('dotenv').config({ path: "./.env.homologacao" });

const express = require("express")
const cors = require("cors")
const mysql = require('mysql')
const app = express()
const { calcFrete } = require('./lib/frete.js')
const { createPixCharge } = require('./lib/pix.js')

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.ENV_HOST_MYSQL,
    user: process.env.ENV_USER_MYSQL,
    password: process.env.ENV_PASSWORD_MYSQL,
    database: process.env.ENV_DATABASE_MYSQL
})

app.get("/products", (req, res) => {

    const sql = 'SELECT * FROM products'

    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
    
})

app.post('/frete', async(req,res)=>{

    const frete = await calcFrete(req.body)
    return res.json(frete.data)

})

app.post('/createNewRequest', async(req,res)=>{

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

app.get('/newRequest/v2/loc/:id/qrcode', async(req, res) => {

    const q = "SELECT * FROM newrequest WHERE ID=?"
    const values = req.params.id

    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })
})

app.post('/newRequest', async(req, res) => {
    const pixCharge = await createPixCharge(req.body)
    const {qrcode, cobranca} = pixCharge;
    res.send({ ok: 1, qrcode, cobranca })
})

app.post('/account/login', async(req, res) => {

    const {email, password} = req.body
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?'
    
    db.query(sql,[email,password], (err, userData) => {
        if (err) return res.json("Error")
            if (userData.length > 0){
                return res.json({msgLoggedIn: 'Usuário logado com sucesso', userData, loggedIn: true})
            }else{
                return res.json({msgLoggedIn: "Usuário ou senha inválidos", loggedIn: false})
            }
        
    })
})

app.post('/account/signup', async(req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"
    const qSql = "INSERT INTO `users` (`firstname` ,`lastname`, `password`,  `email`, `phone`, `birth`) VALUES (?)"
    const {firstname,lastname,password,email,phone,birth} = req.body
    const values = [
        firstname,
        lastname,
        password,
        email,
        phone,
        birth,
    ]

    db.query(q, [email], (err, dataSelect) => {
        
        if (err) return res.json("ErrorSelect");
        
        if (dataSelect.length == 0){

            db.query(qSql,[values], (errInsert, userData) => {
                if (errInsert) return res.json("ErrorInsert")
                return res.json({msgRegistered: 'Cadastrado com sucesso ', userData, registered: true})
            })

        }else{
                res.json({msgRegistered: 'Usuário já cadastrado', registered: false})
            }

    })
    
})

app.get('/profile/:id', async(req, res) => {

    const q = "SELECT * FROM users WHERE ID=?"
    const values = req.params.id

    db.query(q, [values], (err, data) => {
        
        if (err) return res.json("Error");
        return res.json(data)

    })
})

app.listen(3001, (err) => {
    
    if (err) {
        console.log('Servidor não iniciado.');
        console.log(err)
    } else {
        console.log('Servidor do coffee rodando na porta: 3001');
    }
    
})