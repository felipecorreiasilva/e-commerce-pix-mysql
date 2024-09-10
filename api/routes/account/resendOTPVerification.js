const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const { sendOTPVerificationEmail } = require('../../lib/twofa.js');

router.post('/', async(req, res) => {
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

module.exports = router
