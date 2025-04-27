import { Router } from 'express'
import {
  crearPacientePublicoController,
  crearPacienteController,
  listarPacientesController,
  listarPacientesPendientesController,
  actualizarPacienteController,
  eliminarPacienteController,
  registrarConSolicitudController,
  buscarPacientePorCedulaController
} from '../controllers/pacienteController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// 🔓 Público (formulario de pre-registro)
router.post('/publico', crearPacientePublicoController)

// 🔐 Protegidas (panel secretaria)
router.get('/', verifyToken, listarPacientesController)
router.get('/pendientes', verifyToken, listarPacientesPendientesController)
router.post('/', crearPacienteController)
router.put('/', verifyToken, actualizarPacienteController)
router.delete('/:cedula', verifyToken, eliminarPacienteController)
router.post('/registrar-solicitud', registrarConSolicitudController)
router.get('/cedula/:cedula', buscarPacientePorCedulaController)
export default router
