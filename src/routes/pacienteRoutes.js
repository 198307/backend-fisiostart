import { Router } from 'express'
import {
  crearPacientePublicoController,
  crearPacienteController,
  listarPacientesController,
  listarPacientesPendientesController,
  actualizarPacienteController,
  eliminarPacienteController
} from '../controllers/pacienteController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// 🔓 Público (formulario de pre-registro)
router.post('/publico', crearPacientePublicoController)

// 🔐 Protegidas (panel secretaria)
router.get('/', verifyToken, listarPacientesController)
router.get('/pendientes', verifyToken, listarPacientesPendientesController)
router.post('/', verifyToken, crearPacienteController)
router.put('/', verifyToken, actualizarPacienteController)
router.delete('/:cedula', verifyToken, eliminarPacienteController)

export default router
