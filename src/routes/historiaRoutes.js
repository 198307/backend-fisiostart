import { Router } from 'express'
import {
  crearHistoriaController,
  listarHistoriasPorPacienteController,resumenHistoriasMedicoController,resumenHistoriasAdminController,
  historiasPorPacienteYMedicoController,historiasPorPacienteAdminController,actualizarHistoriaController
} from '../controllers/historiaController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'

const router = Router()

// Solo médicos pueden registrar historias
router.post('/', verifyToken, checkRole([1, 3]), crearHistoriaController)

// Médicos y admins pueden ver historias clínicas de un paciente
router.get('/:paciente_id', verifyToken, checkRole([1, 3]), listarHistoriasPorPacienteController)
router.get('/resumen/mis-pacientes', verifyToken, checkRole([1, 3]), resumenHistoriasMedicoController)
router.get('/resumen/general', verifyToken, checkRole([1, 3]), resumenHistoriasAdminController)
router.get('/paciente/:paciente_id', verifyToken, checkRole([1, 3]), historiasPorPacienteYMedicoController)
router.get('/paciente/:paciente_id/admin', verifyToken, checkRole([1, 3]), historiasPorPacienteAdminController)
router.put('/:id', verifyToken, checkRole([1, 3]), actualizarHistoriaController) // solo médicos




export default router
