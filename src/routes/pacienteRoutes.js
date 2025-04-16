import { Router } from 'express'
import { crearPacienteController, listarPacientesController } from '../controllers/pacienteController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'

const router = Router()

router.get('/', verifyToken, checkRole([3, 2]), listarPacientesController)  // admin y secretarias
router.post('/', verifyToken, checkRole([3, 2]), crearPacienteController)   // admin y secretarias

export default router
