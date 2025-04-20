import { Router } from 'express'
import {
  crearMedicoController,
  listarMedicosController,
  actualizarMedicoController,
  eliminarMedicoController
} from '../controllers/medicoControllers.js'

import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'

const router = Router()

// Crear médico
router.post(
  '/',
  verifyToken,
  checkRole([1, 3]), // administrador o secretaria
  crearMedicoController
)

// Listar médicos
router.get(
  '/',
  verifyToken,
  checkRole([1, 3]),
  listarMedicosController
)

// Actualizar médico
router.put(
  '/:id',
  verifyToken,
  checkRole([1, 3]),
  actualizarMedicoController
)

// Eliminar médico
router.delete(
  '/:id',
  verifyToken,
  checkRole([1, 3]),
  eliminarMedicoController
)

console.log('📦 Rutas de médico activadas')

export default router
