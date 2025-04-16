import { crearPacienteService, obtenerPacientesService } from '../services/pacienteService.js'

export const crearPacienteController = async (req, res) => {
  try {
    const nuevo = await crearPacienteService(req.body)
    res.status(201).json(nuevo)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar paciente', detalle: error.message })
  }
}

export const listarPacientesController = async (req, res) => {
  try {
    const pacientes = await obtenerPacientesService()
    res.json(pacientes)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pacientes', detalle: error.message })
  }
}
