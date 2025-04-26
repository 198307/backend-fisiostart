// 📄 src/routes/citaRoutes.js
import { Router } from 'express'
import {
  crearCitaController,
  listarCitasController,
  listarCitasPorMedicoController,
  actualizarEstadoCitaController,
  eliminarCitaController
} from '../controllers/citaController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// Crear cita
router.post('/', verifyToken, crearCitaController)

// Listar todas las citas (Admin)
router.get('/', verifyToken, listarCitasController)

// Listar citas de un médico
router.get('/medico/:medico_id', verifyToken, listarCitasPorMedicoController)

// Actualizar estado de cita
router.put('/:id', verifyToken, actualizarEstadoCitaController)

// Eliminar cita
router.delete('/:id', verifyToken, eliminarCitaController)

export default router
