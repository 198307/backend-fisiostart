// 📄 src/controllers/citaController.js
import {
  crearCitaService,
  listarCitasService,
  listarCitasPorMedicoService,
  actualizarEstadoCitaService,
  eliminarCitaService
} from '../services/citaService.js'

// Crear nueva cita
export const crearCitaController = async (req, res) => {
  try {
    const cita = await crearCitaService(req.body)
    res.status(201).json(cita)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cita', detalle: error.message })
  }
}

// Listar todas las citas
export const listarCitasController = async (req, res) => {
  try {
    const citas = await listarCitasService()
    res.json(citas)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar citas', detalle: error.message })
  }
}

// Listar citas de un médico
export const listarCitasPorMedicoController = async (req, res) => {
  try {
    const { medico_id } = req.params
    const citas = await listarCitasPorMedicoService(medico_id)
    res.json(citas)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar citas de médico', detalle: error.message })
  }
}

// Actualizar estado de cita
export const actualizarEstadoCitaController = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    const cita = await actualizarEstadoCitaService(id, estado)
    res.json(cita)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cita', detalle: error.message })
  }
}

// Eliminar cita
export const eliminarCitaController = async (req, res) => {
  try {
    const { id } = req.params
    await eliminarCitaService(id)
    res.json({ message: 'Cita eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cita', detalle: error.message })
  }
}
