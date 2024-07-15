import pg from 'pg';
import 'dotenv/config'
const { Pool } = pg;

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
}

export const pool = new Pool(config)


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Error connectin to DB', err)
    } else {
        console.log('🔋 DB-Connected', res.rows[0].now)
    }
})