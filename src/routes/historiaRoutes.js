import { Router } from 'express';
import {
  crearHistoriaClinicaController,
  listarHistoriasClinicasController,
  listarHistoriasPorPacienteController,
  eliminarHistoriaClinicaController
} from '../controllers/historiaController.js';

import { verifyToken } from '../middlewares/verifyToken.js'; // 👈 Opcional si quieres proteger las rutas

const router = Router();

// 📌 Crear nueva historia clínica
router.post('/', verifyToken, crearHistoriaClinicaController);

// 📌 Listar todas las historias clínicas
router.get('/', verifyToken, listarHistoriasClinicasController);

// 📌 Listar historias de un paciente específico
router.get('/paciente/:paciente_id', verifyToken, listarHistoriasPorPacienteController);

// 📌 Eliminar una historia clínica
router.delete('/:id', verifyToken, eliminarHistoriaClinicaController);

export default router;
