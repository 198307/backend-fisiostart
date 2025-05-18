import http from 'http'
import https from 'https'
import fs from 'fs'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const HTTP_PORT = process.env.PORT || 3000
const HTTPS_PORT = process.env.HTTPS_PORT || 3443

let httpsOptions = {}
let httpsEnabled = false

try {
  httpsOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
  }
  httpsEnabled = true
  console.log('🔐 Certificados HTTPS cargados correctamente')
} catch (err) {
  console.warn('⚠️  Certificados no encontrados. Solo se usará HTTP.')
}

// En producción, redirigir HTTP → HTTPS
if (httpsEnabled) {
  http.createServer((req, res) => {
    const host = req.headers.host?.replace(/:\d+$/, ':' + HTTPS_PORT)
    const redirectUrl = `https://${host}${req.url}`
    res.writeHead(301, { Location: redirectUrl })
    res.end()
  }).listen(HTTP_PORT, () => {
    console.log(`🌐 Redirección HTTP → HTTPS activa en puerto ${HTTP_PORT}`)
  })

  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`🚀 Servidor HTTPS corriendo en https://localhost:${HTTPS_PORT}`)
  })
} else {
  http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`🚀 Servidor HTTP corriendo en http://localhost:${HTTP_PORT}`)
  })
}
console.log('👋 Bienvenido a la API de Citas Médicas')