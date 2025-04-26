import pool from '../config/conex.js'
import bcrypt from 'bcrypt'
import {
  obtenerMedicos,
  insertarMedicoConEspecialidades,
  actualizarMedicoConEspecialidades,
  eliminarMedico,obtenerMedicosPorEspecialidad
} from '../queries/medicoQueries.js'

// Crear un nuevo médico
export const crearMedicoService = async (medico) => {
  const {
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    username,
    password,
    especialidades = []
  } = medico

  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await pool.query(insertarMedicoConEspecialidades, [
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    username,
    hashedPassword,
    especialidades
  ])

  return result.rows[0]
}

// Obtener todos los médicos estructurados
export const obtenerMedicosService = async () => {
  const result = await pool.query(obtenerMedicos)
  return result.rows.map(row => row.medico)
}

// Actualizar médico y especialidades
export const actualizarMedicoService = async (id, datos) => {
  const {
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    username,
    password,
    especialidades = []
  } = datos

  // Si no hay contraseña, mandamos null para evitar cambiarla
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null

  const result = await pool.query(actualizarMedicoConEspecialidades, [
    id,
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    username,
    hashedPassword,
    especialidades
  ])

  return result.rows[0]
}

// Eliminar médico (y sus especialidades)
export const eliminarMedicoService = async (id) => {
  await pool.query(eliminarMedico, [id])
  return { mensaje: 'Médico eliminado correctamente' }
}

export const listarMedicosPorEspecialidadService = async (especialidad_id) => {
  const result = await pool.query(obtenerMedicosPorEspecialidad, [especialidad_id])
  return result.rows
}

