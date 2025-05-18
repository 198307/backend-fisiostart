import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import rutas from './src/routes/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Acceso bloqueado por política CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('👋 Bienvenido a la API de Citas Médicas')
})

app.use('/api', rutas)
console.log('🔥 Middleware de rutas cargado')

app.use((err, req, res, next) => {
  if (err.message === 'Acceso bloqueado por política CORS') {
    return res.status(403).json({ message: '❌ Origen no autorizado por CORS' })
  }
  next(err)
})

export default app
