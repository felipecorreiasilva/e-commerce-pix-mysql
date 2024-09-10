require('dotenv').config({ path: "./.env.homologacao" });

const express = require("express")
const cors = require("cors")

const app = express()

// routes
const products = require('./routes/products.js')
const frete = require('./routes/frete.js')
const newRequest = require('./routes/newRequest.js')
const createNewRequest = require('./routes/createNewRequest.js')
const account = require('./routes/account/account.js')
const signup = require('./routes/account/signup.js')
const login = require('./routes/account/login.js')
const verifyOTP = require('./routes/account/verifyOTP.js')
const resendOTPVerification = require('./routes/account/resendOTPVerification.js')

app.use(cors());
app.use(express.json())

// express use routes
app.use('/products',products)
app.use('/frete',frete)
app.use('/newRequest',newRequest)
app.use('/createNewRequest',createNewRequest)
app.use('/account',account)
app.use('/account/signup',signup)
app.use('/account/login',login)
app.use('/account/verifyOTP',verifyOTP)
app.use('/account/resendOTPVerification',resendOTPVerification)

app.listen(3001, (err) => {
    
    if (err) {
        console.log('Servidor não iniciado.');
        console.log(err)
    } else {
        console.log('Servidor do coffee rodando na porta: 3001');
    }
    
})