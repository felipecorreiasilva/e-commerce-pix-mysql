const express = require('express')
const router = express.Router()
const { db } = require('../../db');
const {compare} = require('bcrypt');

router.post('/:id', async(req, res) => {
    
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

module.exports = router
