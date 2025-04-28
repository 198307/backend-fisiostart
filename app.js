import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import rutas from './src/routes/index.js'
import dotenv from 'dotenv'

// Configurar dotenv
dotenv.config()

const app = express()

// Crear whitelist (permitidos)
const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : []

// Opciones CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Acceso bloqueado por política CORS'))
    }
  },
  credentials: true, // Permitir enviar cookies o headers especiales
}

// Middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())

// Ruta simple de prueba
app.get('/', (req, res) => {
  res.send('👋 Bienvenido a la API de Citas Médicas')
})

// Rutas principales
app.use('/api', rutas)
console.log('🔥 Middleware de rutas cargado')

// Capturar errores CORS de forma elegante
app.use((err, req, res, next) => {
  if (err.message === 'Acceso bloqueado por política CORS') {
    return res.status(403).json({ message: '❌ Origen no autorizado por CORS' })
  }
  next(err)
})

export default app
