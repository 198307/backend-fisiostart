import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Ruta absoluta a la carpeta /uploads/img
const folderPath = path.join(process.cwd(), 'uploads', 'img')

// Asegurar que la carpeta exista
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true })
  console.log(`📁 Carpeta creada: ${folderPath}`)
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, folderPath)
  },
  filename: function (req, file, cb) {
    const nombreUnico = Date.now() + '-' + file.originalname.replace(/\s/g, '')
    cb(null, nombreUnico)
  }
})

// Filtro opcional: solo imágenes (puedes quitar si no lo necesitas)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Formato de archivo no permitido'), false)
  }
}

const upload = multer({ storage, fileFilter })

export default upload
