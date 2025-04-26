import { Router } from 'express'
import {
  crearSolicitudCitaController,
  listarSolicitudesPorPacienteController,
  listarTodasSolicitudesController,
  actualizarEstadoSolicitudController,
  eliminarSolicitudCitaController
} from '../controllers/solicitudController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// 🔓 Pública (crear solicitud)
router.post('/', crearSolicitudCitaController)

// 🔐 Protegidas (para admin)
router.get('/', verifyToken, listarTodasSolicitudesController) // nuevo
router.get('/paciente/:paciente_id', verifyToken, listarSolicitudesPorPacienteController)
router.put('/:id', verifyToken, actualizarEstadoSolicitudController)
router.delete('/:id', verifyToken, eliminarSolicitudCitaController)

export default router
