const {hash} = require('bcrypt');
const { db } = require('../db.js');
const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp.js')

const sendOTPVerificationEmail = async ( data ) => {

    const otpSql = "INSERT INTO `users_otp` (`userId` ,`otp`, `createdAt`, `expiresAt`) VALUES (?)"

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.auth.user,
            pass: SMTP_CONFIG.auth.pass,
        },
        tls: {
            rejectUnauthorized: false
        },
    })
    // const mailOptions = {
    //     from: process.env.ENV_EMAIL,
    //     to: email,
    //     subject: "Verify Your Email",
    //     html: `<p>Enter <b>${otp}</b> in the app to verify your email address and completed</p>
    //     <p>This code <b>expires in 1 hour</b>.</p>`
    // };
    
    const mailSent = await transporter.sendMail({
        text: `Olá ${data.firstname} ${data.lastname}, confirme sua conta`,
        subject: 'Verificação de email',
        from: `Coffee Shop <${process.env.AUTH_EMAIL}>`,
        to: data.email,
        html: `<p>Digitar <b>${otp}</b> no aplicativo para verificar seu endereço de e-mail e concluído</p>
        <p>Este código  <b>expira em 1 hora</b>.</p>`
    })

    console.log('Email',mailSent)

    const saltRounds = 10;
    const hashedOTP = await hash(otp, saltRounds);

    const otpData = {
        userId: data.userId,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
    }


    const valuesOtp = [
        otpData.userId,
        otpData.otp,
        otpData.createdAt,
        otpData.expiresAt,
        
    ]

    db.query(otpSql,[valuesOtp], async(errInsert, _otpData) => {
        if (errInsert) return res.json("ErrorInsert")
        return _otpData    
    })

        
}

module.exports = {
    sendOTPVerificationEmail
}