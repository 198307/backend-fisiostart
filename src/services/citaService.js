// 📄 src/services/citaService.js
import pool from '../config/conex.js'
import {
  insertarCita,
  obtenerCitas,
  obtenerCitasPorMedico,
  actualizarEstadoCita,
  eliminarCita
} from '../queries/citaQueries.js'

// Crear nueva cita
export const crearCitaService = async (datos) => {
  const {
    paciente_id,
    medico_id,
    especialidad_id,
    fecha,
    hora,
    estado = 'programada',
    motivo = null
  } = datos

  const result = await pool.query(insertarCita, [
    paciente_id,
    medico_id,
    especialidad_id,
    fecha,
    hora,
    estado,
    motivo
  ])

  return result.rows[0]
}

// Listar todas las citas
export const listarCitasService = async () => {
  const result = await pool.query(obtenerCitas)
  return result.rows
}

// Listar citas de un médico específico
export const listarCitasPorMedicoService = async (medico_id) => {
  const result = await pool.query(obtenerCitasPorMedico, [medico_id])
  return result.rows
}

// Actualizar estado de cita
export const actualizarEstadoCitaService = async (id, nuevoEstado) => {
  const result = await pool.query(actualizarEstadoCita, [nuevoEstado, id])
  return result.rows[0]
}

// Eliminar cita
export const eliminarCitaService = async (id) => {
  await pool.query(eliminarCita, [id])
  return { success: true }
}
