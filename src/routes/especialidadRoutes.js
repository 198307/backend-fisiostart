import { Router } from 'express'
import { listarEspecialidadesController } from '../controllers/especialidadControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

router.get('/', verifyToken, listarEspecialidadesController)

export default router
