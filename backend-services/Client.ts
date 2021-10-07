const { Pool } = require('pg')

export default () => {
    return new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL === 'true',
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 0,
    })
}