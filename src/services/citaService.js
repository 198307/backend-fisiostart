import pool from '../config/conex.js'
import { insertarCita, obtenerCitas,obtenerCitasPorMedico } from '../queries/citaQueries.js'

export const crearCitaService = async (cita) => {
  const { paciente_id, medico_id, fecha, hora, estado, motivo } = cita
  const result = await pool.query(insertarCita, [
    paciente_id,
    medico_id,
    fecha,
    hora,
    estado || 'pendiente',
    motivo
  ])
  return result.rows[0]
}

export const obtenerCitasService = async () => {
  const result = await pool.query(obtenerCitas)
  return result.rows
}

export const obtenerCitasPorMedicoService = async (medicoId) => {
    const result = await pool.query(obtenerCitasPorMedico, [medicoId])
    return result.rows
  }
