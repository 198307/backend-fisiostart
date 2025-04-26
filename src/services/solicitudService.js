import pool from '../config/conex.js'
import {
  insertarSolicitudCita,
  obtenerSolicitudesPorPaciente,
  obtenerTodasSolicitudes,
  actualizarEstadoSolicitud,
  eliminarSolicitudCita
} from '../queries/solicitudQueries.js'

// 🔹 Crear solicitud
export const crearSolicitudCitaService = async ({ paciente_id, especialidad_id, estado = 'pendiente' }) => {
  const result = await pool.query(insertarSolicitudCita, [paciente_id, especialidad_id, estado])
  return result.rows[0]
}

// 🔹 Obtener solicitudes por paciente
export const listarSolicitudesPorPacienteService = async (paciente_id) => {
  const result = await pool.query(obtenerSolicitudesPorPaciente, [paciente_id])
  return result.rows
}

// 🔥 Obtener TODAS las solicitudes (nuevo)
export const listarTodasSolicitudesService = async () => {
  const result = await pool.query(obtenerTodasSolicitudes)
  return result.rows
}

// 🔹 Actualizar estado
export const actualizarEstadoSolicitudService = async (id, nuevoEstado) => {
  const result = await pool.query(actualizarEstadoSolicitud, [nuevoEstado, id])
  return result.rows[0]
}

// 🔹 Eliminar solicitud
export const eliminarSolicitudCitaService = async (id) => {
  await pool.query(eliminarSolicitudCita, [id])
  return { success: true }
}
