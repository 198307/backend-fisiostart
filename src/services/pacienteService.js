import pool from '../config/conex.js'
import {
  insertarPacientePublico,
  insertarPaciente,
  obtenerPacientes,
  obtenerPacientesPendientes,
  actualizarPaciente,
  eliminarPaciente
} from '../queries/pacienteQueries.js'

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

export const crearPacienteService = async (datos) => {
  const {
    cedula, nombre, apellidos, direccion,
    telefono, email, fecha_nacimiento, sexo
  } = datos

  const result = await pool.query(insertarPaciente, [
    cedula,
    nombre,
    apellidos,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
    sexo
  ])
  return result.rows[0]
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
    cedula, nombre, apellidos, direccion,
    telefono, email, fecha_nacimiento, sexo
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
