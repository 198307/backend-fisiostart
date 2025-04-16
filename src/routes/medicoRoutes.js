import { Router } from 'express'
import { crearMedicoController, listarMedicosController } from '../controllers/medicoControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'


const router = Router()

router.get('/',verifyToken, listarMedicosController)
router.post('/', verifyToken, crearMedicoController)

console.log('📦 Rutas de médico activadas')

export default router
