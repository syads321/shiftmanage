const { Client } = require('pg')

export default () => {
    return new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL === 'true'
    })
}