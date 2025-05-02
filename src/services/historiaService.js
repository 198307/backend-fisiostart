// 📁 src/services/historiaClinicaService.js
import pool from '../config/conex.js'
import {
  insertarHistoriaClinica,
  actualizarHistoriaClinicaQuery,
  obtenerHistoriaClinicaPorId, // ✅ nombre corregido
  obtenerHistoriasClinicas,     // ✅ nombre corregido
  eliminarHistoriaClinica
} from '../queries/historiaQueries.js'

// 🔹 Crear una historia clínica
export const crearHistoriaClinicaService = async (datos) => {
  const {
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones,
    cita_id
  } = datos

  const result = await pool.query(insertarHistoriaClinica, [
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones,
    cita_id
  ])
  return result.rows[0]
}

// 🔹 Listar todas las historias (con JOIN)
export const listarHistoriasClinicasService = async () => {
  const result = await pool.query(obtenerHistoriasClinicas)
  return result.rows
}

// 🔹 Obtener una historia por ID
export const obtenerHistoriaPorIdService = async (id) => {
  const result = await pool.query(obtenerHistoriaClinicaPorId, [id])
  return result.rows[0] || null
}

// 🔹 Actualizar historia
export const actualizarHistoriaClinicaService = async (id, datos) => {
  const {
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones
  } = datos

  const result = await pool.query(actualizarHistoriaClinicaQuery, [
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones,
    id
  ])
  return result.rows[0]
}

// 🔹 Eliminar historia
export const eliminarHistoriaClinicaService = async (id) => {
  await pool.query(eliminarHistoriaClinica, [id])
  return { success: true }
}
