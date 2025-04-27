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
    console.error('❌ Error al crear cita:', error)
    res.status(500).json({ error: 'Error al crear cita', detalle: error.message })
  }
}

// Listar citas (controlado según el rol del usuario)
export const listarCitasController = async (req, res) => {
  try {
    console.log('🛡️ Usuario autenticado en listarCitasController:', req.user)

    const citas = await listarCitasService(req.user)
    res.json(citas)
  } catch (error) {
    console.error('❌ Error en listarCitasController:', error)
    res.status(500).json({ error: 'Error al listar citas', detalle: error.message })
  }
}

// Listar citas de un médico específico (acceso manual si lo necesitas)
export const listarCitasPorMedicoController = async (req, res) => {
  try {
    const { medico_id } = req.params
    const citas = await listarCitasPorMedicoService(medico_id)
    res.json(citas)
  } catch (error) {
    console.error('❌ Error al listar citas de médico:', error)
    res.status(500).json({ error: 'Error al listar citas de médico', detalle: error.message })
  }
}

// Actualizar estado de una cita
export const actualizarEstadoCitaController = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    const cita = await actualizarEstadoCitaService(id, estado)
    res.json(cita)
  } catch (error) {
    console.error('❌ Error al actualizar estado de cita:', error)
    res.status(500).json({ error: 'Error al actualizar cita', detalle: error.message })
  }
}

// Eliminar una cita
export const eliminarCitaController = async (req, res) => {
  try {
    const { id } = req.params
    await eliminarCitaService(id)
    res.json({ message: 'Cita eliminada correctamente' })
  } catch (error) {
    console.error('❌ Error al eliminar cita:', error)
    res.status(500).json({ error: 'Error al eliminar cita', detalle: error.message })
  }
}
