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

// Listar citas (según el rol del usuario)
export const listarCitasService = async (usuario) => {
  let rolTexto = ''

  // 📌 Normalizar el rol recibido
  if (typeof usuario.rol === 'object') {
    rolTexto = usuario.rol.nombre?.toLowerCase().trim()
  } else if (typeof usuario.rol === 'string') {
    rolTexto = usuario.rol.toLowerCase().trim()
  } else if (typeof usuario.rol === 'number') {
    // Mapear ID de rol a texto
    switch (usuario.rol) {
      case 1:
        rolTexto = 'medico'
        break
      case 2:
        rolTexto = 'secretaria'
        break
      case 3:
        rolTexto = 'administrador'
        break
      default:
        throw new Error('Rol desconocido en usuario')
    }
  } else {
    throw new Error('Formato de rol inválido')
  }

  // 🔥 Lógica según el rol
  if (rolTexto === 'administrador' || rolTexto === 'secretaria') {
    const result = await pool.query(obtenerCitas)
    return result.rows
  } else if (rolTexto === 'medico') {
    const result = await pool.query(obtenerCitasPorMedico, [usuario.id])
    return result.rows
  } else {
    throw new Error('Rol no autorizado para listar citas')
  }
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
