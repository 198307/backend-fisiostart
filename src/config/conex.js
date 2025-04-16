import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Pool } = pkg

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
})

const verificarConexion = async () => {
  try {
    const result = await pool.query('SELECT NOW()')
    console.log('✅ Conectado a PostgreSQL local:', result.rows[0].now)
  } catch (err) {
    console.error('❌ Error al conectar con PostgreSQL local:', err)
  }
}

verificarConexion()

export default pool
