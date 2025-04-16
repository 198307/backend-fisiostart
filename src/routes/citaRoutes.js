import { Router } from 'express'
import { crearCitaController, listarCitasController,listarCitasMedicoController } from '../controllers/citaController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'

const router = Router()

// Acceso: administradores y secretarias
router.get('/', verifyToken, checkRole([3, 2]), listarCitasController)
router.post('/', verifyToken, checkRole([3, 2]), crearCitaController)
router.get('/mis-citas', verifyToken, checkRole([1]), listarCitasMedicoController)

export default router
