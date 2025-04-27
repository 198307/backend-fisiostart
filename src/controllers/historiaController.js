import {
  crearHistoriaClinicaService,
  listarHistoriasClinicasService,
  listarHistoriasPorPacienteService,
  eliminarHistoriaClinicaService
} from '../services/historiaService.js';

// 🔹 Crear historia clínica
export const crearHistoriaClinicaController = async (req, res) => {
  try {
    const historia = await crearHistoriaClinicaService(req.body);
    res.status(201).json({
      message: 'Historia clínica creada correctamente',
      historia
    });
  } catch (error) {
    console.error('❌ Error al crear historia clínica:', error.message);
    res.status(500).json({
      error: 'Error al crear historia clínica',
      detalle: error.message
    });
  }
};

// 🔹 Listar todas las historias clínicas
export const listarHistoriasClinicasController = async (req, res) => {
  try {
    const historias = await listarHistoriasClinicasService();
    res.json(historias);
  } catch (error) {
    console.error('❌ Error al listar historias clínicas:', error.message);
    res.status(500).json({
      error: 'Error al listar historias clínicas',
      detalle: error.message
    });
  }
};

// 🔹 Listar historias clínicas por paciente
export const listarHistoriasPorPacienteController = async (req, res) => {
  try {
    const { paciente_id } = req.params;
    const historias = await listarHistoriasPorPacienteService(paciente_id);
    res.json(historias);
  } catch (error) {
    console.error('❌ Error al listar historias por paciente:', error.message);
    res.status(500).json({
      error: 'Error al listar historias por paciente',
      detalle: error.message
    });
  }
};

// 🔹 Eliminar historia clínica
export const eliminarHistoriaClinicaController = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarHistoriaClinicaService(id);
    res.json({ message: 'Historia clínica eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar historia clínica:', error.message);
    res.status(500).json({
      error: 'Error al eliminar historia clínica',
      detalle: error.message
    });
  }
};
