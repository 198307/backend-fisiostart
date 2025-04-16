import pool from '../config/conex.js'
import { insertarPaciente, obtenerPacientes } from '../queries/pacienteQueries.js'

export const crearPacienteService = async (paciente) => {
  const {
    cedula, nombre, apellidos, direccion,
    telefono, email, fecha_nacimiento, sexo
  } = paciente

  const result = await pool.query(insertarPaciente, [
    cedula, nombre, apellidos, direccion,
    telefono, email, fecha_nacimiento, sexo
  ])

  return result.rows[0]
}

export const obtenerPacientesService = async () => {
  const result = await pool.query(obtenerPacientes)
  return result.rows
}
