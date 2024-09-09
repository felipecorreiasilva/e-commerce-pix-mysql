require('dotenv').config({ path: "./.env.homologacao" });

const express = require("express")
const cors = require("cors")

const app = express()
const { calcFrete } = require('./lib/frete.js')
const { createPixCharge } = require('./lib/pix.js')
const {hash, compare} = require('bcrypt');
const { db } = require('./db.js');
const { sendOTPVerificationEmail } = require('./lib/twofa.js');

app.use(cors());
app.use(express.json())



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
    return res.send({ ok: 1, qrcode, cobranca })
})

app.post('/account/login', async(req, res) => {

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

app.post('/account/signup', async(req, res) => {

    const q = "SELECT * FROM users WHERE email = ?"
    const qSql = "INSERT INTO `users` (`firstname` ,`lastname`, `password`,  `email`, `phone`, `birth`, `verified`) VALUES (?)"

    const {firstname,lastname,password,email,phone,birth} = req.body
    const verified = false
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds)

    const values = [
        firstname,
        lastname,
        hashedPassword,
        email,
        phone,
        birth,
        verified
    ]

    db.query(q, [email], (err, dataSelect) => {
        
        if (err) return res.json("ErrorSelect");
        
        if (dataSelect.length == 0){

            db.query(qSql,[values], async(errInsert, userData) => {

                if (errInsert) return res.json("ErrorInsert")

                    const objOtpVerification = {
                        userId: userData.insertId,
                        firstname,
                        lastname,
                        email,

                    }

                    const otpData = await sendOTPVerificationEmail(objOtpVerification)
                     
                    return res.json({msgRegistered: 'Cadastrado com sucesso ', userData, registered: true, msgOtp: 'Código de verificação enviado ', otpData})
                    
            })

        }else{
                return res.json({msgRegistered: 'Usuário já cadastrado', registered: false})
            }

    })
    
})

app.post('/account/verifyOTP/:id', async(req, res) => {
    
    const {userId, otp } = req.body;
    const q = "SELECT * FROM users_otp WHERE userId=?"
    const qDelete = 'DELETE FROM users_otp WHERE userId=?'
    const qUpdate = 'UPDATE users SET `verified` = ? WHERE ID=?'
    const _otp = otp.join('')
    const values = [
        userId
    ]
    
    db.query(q, [values], async(err, UserOTPVerificationRecords) => {
        
        if (err) return res.json("ErrorA");
        if (_otp.length < 4){
            return res.json({msgError: `O código de verificação precisar conter 4 digitos, você forneceu ${_otp.length}`})
        }
        if (!userId || !_otp) {
            return res.json({msgError: 'Detalhes de OTP vazios não são permitidos'})
        } else
            if (UserOTPVerificationRecords.length <= 0) {
                return res.json({msgError:"Usuário não possui um código de verificação, tente solicitar novamente."})
            } else {
                // userOtp exist
                const { expiresAt } = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    // user otp record has expired
                    db.query(qDelete, [req.params.id], (err, dataDelete) =>{
                        if (err) return res.json("Error");
                        console.log('af',expiresAt, 'uf', Date.now())
                        return res.status(200).json({msgError: 'Código de verificação foi expirado, porfavor solicite outro novamente', dataDelete})
                    })

                } else {
                    const validOTP = await compare(_otp, hashedOTP);

                    if (!validOTP) {
                        
                        // supplied otp is wrong
                        return res.json({msgError:'Código de verificação inválido. Verifique sua caixa de entrada.'});

                    } else {
                        
                        // success
                        db.query(qUpdate, [true,req.params.id], (err, userUpdate) =>{
                            if (err) return res.json("Error");
                            return res.status(200).json({msgSuccess: 'Conta verificada com sucesso!', userUpdate, verified:true})
                        })
                        
                    }

                }



            }
        
        

    })

})

app.post('/account/resendOTPVerificationCode', async(req, res) => {
    let { userId, email, firstname, lastname } = req.body
    const q = "SELECT * FROM users_otp WHERE userId=?"
    const qDelete = 'DELETE FROM users_otp WHERE userId=?'

    const objOtpVerification = {
        userId: parseInt(userId),
        firstname,
        lastname,
        email,

    }

    if (!userId || !email){
        return res.json('Detalhes de usuário vazios não são permitidos')
    } else {
        // delete existing records and resend
        db.query(q, [userId], async(err, UserOTPVerificationRecords) =>{
            if (err) {return res.json("Error Select");}
            
                if (UserOTPVerificationRecords.length > 0) {
                    db.query(qDelete, [userId], async(err, dataDelete) =>{
                        if (err) return res.json("Error");
                        
                        const otpData = await sendOTPVerificationEmail(objOtpVerification)
                        return res.status(200).json({msg: 'Código de verificação antigo foi deletado e enviado um novo', dataDelete, otpData})
                    })
                    
                }else {
                    
                    const otpData = await sendOTPVerificationEmail(objOtpVerification)
                    return res.status(200).json({msg: 'Código de verificação foi enviado novamente',otpData})

                }
            
            
        })
    }

})


app.get('/account/:id', async(req, res) => {

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