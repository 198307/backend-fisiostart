import pool from '../config/conex.js'
import {
  insertarPacientePublico,
  insertarPaciente,
  obtenerPacientes,
  obtenerPacientesPendientes,
  actualizarPaciente,
  eliminarPaciente
} from '../queries/pacienteQueries.js'

// 🔹 Registro desde formulario público (estado: pendiente)
export const crearPacientePublicoService = async (datos) => {
  const { cedula, nombre, apellidos, telefono, email } = datos

  const result = await pool.query(insertarPacientePublico, [
    cedula,
    nombre,
    apellidos,
    telefono,
    email
  ])

  return result.rows[0]
}

// 🔹 Registro completo desde panel (admin/secretaria)
export const crearPacienteService = async (datos) => {
  try {
    const {
      cedula,
      nombre,
      apellidos,
      direccion,
      telefono,
      email,
      fecha_nacimiento,
      sexo,
      estado
    } = datos

    // Validaciones básicas
    if (!cedula || !nombre || !apellidos || !estado) {
      throw new Error('Faltan campos requeridos')
    }

    if (!['completado', 'pendiente'].includes(estado)) {
      throw new Error('Estado inválido: debe ser "completado" o "pendiente"')
    }

    console.log('🧾 Backend recibe:', datos)

    const result = await pool.query(insertarPaciente, [
      cedula,
      nombre,
      apellidos,
      direccion,
      telefono,
      email,
      fecha_nacimiento,
      sexo,
      estado
    ])

    return result.rows[0]
  } catch (error) {
    console.error('❌ Error real en backend:', error.message)
    console.error('📄 Stack:', error.stack)
    throw error
  }
}


export const listarPacientesService = async () => {
  const result = await pool.query(obtenerPacientes)
  return result.rows
}

export const listarPacientesPendientesService = async () => {
  const result = await pool.query(obtenerPacientesPendientes)
  return result.rows
}

export const actualizarPacienteService = async (datos) => {
  const {
    cedula,
    nombre,
    apellidos,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
    sexo
  } = datos

  const result = await pool.query(actualizarPaciente, [
    nombre,
    apellidos,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
    sexo,
    cedula
  ])

  return result.rows[0]
}

export const eliminarPacienteService = async (cedula) => {
  await pool.query(eliminarPaciente, [cedula])
  return { success: true }
}
