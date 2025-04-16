import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import rutas from './src/routes/index.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', 
}))

app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('👋 Bienvenido a la API de Citas Médicas')
})

app.use('/api', rutas)
console.log('🔥 Middleware de rutas cargado')

export default app
