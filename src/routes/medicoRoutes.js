import { Router } from 'express'
import {
  crearMedicoController,
  listarMedicosController,
  actualizarMedicoController,
  eliminarMedicoController,listarMedicosPorEspecialidadController
} from '../controllers/medicoControllers.js'

import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'

const router = Router()

// Crear médico
router.post(
  '/',
  verifyToken,
  checkRole([2,3]), // administrador o secretaria
  crearMedicoController
)

// Listar médicos
router.get(
  '/',
  verifyToken,
  checkRole([1,2, 3]),
  listarMedicosController
)

// Actualizar médico
router.put(
  '/:id',
  verifyToken,
  checkRole([2, 3]),
  actualizarMedicoController
)

// Eliminar médico
router.delete(
  '/:id',
  verifyToken,
  checkRole([2, 3]),
  eliminarMedicoController
)

router.get('/especialidad/:id', verifyToken, listarMedicosPorEspecialidadController)

console.log('📦 Rutas de médico activadas')

export default router
