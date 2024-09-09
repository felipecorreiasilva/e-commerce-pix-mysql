const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.ENV_HOST_MYSQL,
    user: process.env.ENV_USER_MYSQL,
    password: process.env.ENV_PASSWORD_MYSQL,
    database: process.env.ENV_DATABASE_MYSQL
})

module.exports = {
    db
}