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

// 📌 Crear cita (cualquiera con login puede crear: admin, secretaria)
router.post('/', verifyToken, crearCitaController)

// 📌 Listar citas (aplica control dinámico según rol en el controller/service)
router.get('/', verifyToken, listarCitasController)

// 📌 Listar citas de un médico específico (usada solo internamente si quieres consultar manualmente)
router.get('/medico/:medico_id', verifyToken, listarCitasPorMedicoController)

// 📌 Actualizar estado de cita
router.put('/:id', verifyToken, actualizarEstadoCitaController)

// 📌 Eliminar cita
router.delete('/:id', verifyToken, eliminarCitaController)

export default router
