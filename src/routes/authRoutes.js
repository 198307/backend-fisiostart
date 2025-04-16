import { Router } from 'express'
import { loginController, perfilController } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// 🔐 Ruta de autenticación (login)
router.post('/login', loginController)

// 👤 Ruta protegida: obtener perfil del usuario autenticado
router.get('/perfil', verifyToken, perfilController)

export default router
