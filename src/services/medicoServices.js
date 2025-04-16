import pool from '../config/conex.js'
import bcrypt from 'bcrypt'
import { insertarMedico, obtenerMedicos } from '../queries/medicoQueries.js'

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
    rol_id
  } = medico

  // Encriptar la contraseña antes de guardar
  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await pool.query(insertarMedico, [
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    username,
    hashedPassword, // contraseña segura
    rol_id
  ])

  return result.rows[0]
}

// Obtener todos los médicos estructurados
export const obtenerMedicosService = async () => {
  const result = await pool.query(obtenerMedicos)

  // Extraer solo el contenido del campo "medico" de cada fila
  return result.rows.map(row => row.medico)
}
