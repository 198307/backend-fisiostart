// 📄 src/routes/historiaClinicaRoutes.js
import { Router } from 'express'
import {
  crearHistoriaClinicaController,
  obtenerHistoriasClinicasController,
  obtenerHistoriaClinicaPorIdController,
  actualizarHistoriaClinicaController,
  eliminarHistoriaClinicaController,
  obtenerHistoriasPorPacienteController
} from '../controllers/historiaController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const router = Router()

// 📌 Rutas protegidas
router.post('/', verifyToken, crearHistoriaClinicaController)
router.get('/', verifyToken, obtenerHistoriasClinicasController)
router.get('/:id', verifyToken, obtenerHistoriaClinicaPorIdController)
router.get('/paciente/:id', verifyToken, obtenerHistoriasPorPacienteController)
router.put('/:id', verifyToken, actualizarHistoriaClinicaController)
router.delete('/:id', verifyToken, eliminarHistoriaClinicaController)

export default router
