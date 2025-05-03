// 📁 src/services/historiaClinicaService.js
import pool from '../config/conex.js'
import {
  insertarHistoriaClinica,
  actualizarHistoriaClinicaQuery,
  obtenerHistoriaClinicaPorId,
  obtenerHistoriasClinicas,
  eliminarHistoriaClinica
} from '../queries/historiaQueries.js'

// 🔹 Crear una historia clínica
export const crearHistoriaClinicaService = async (datos) => {
  console.log('📥 [Service] Datos recibidos en crearHistoriaClinicaService:', datos)

  // Verificar si hay campos no esperados
  if ('paciente_id' in datos) {
    console.warn('⚠️ El objeto contiene un campo inesperado: paciente_id')
  }

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

  const valores = [
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
  ]

  console.log('📤 [Service] Valores que se enviarán al query INSERT:', valores)

  const result = await pool.query(insertarHistoriaClinica, valores)

  console.log('✅ [Service] Resultado insertado:', result.rows[0])

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
