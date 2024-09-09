module.exports = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
}