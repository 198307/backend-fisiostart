import pool from '../config/conex.js'
import { insertarHistoriaClinica, obtenerHistoriasPorPaciente,obtenerUltimasHistoriasPorMedico,
    obtenerUltimasHistoriasDeTodos,obtenerHistoriasPacienteAtendidoPorMedico, actualizarHistoriaClinica,
    eliminarHistoriaClinica
 } from '../queries/historiaQueries.js'

export const crearHistoriaService = async (historia) => {
  const {
    paciente_id, alergias, medicamento,
    nivel_glucosa, peso, estatura, imc,
    problemas_salud, recomendaciones
  } = historia

  const result = await pool.query(insertarHistoriaClinica, [
    paciente_id,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones
  ])

  return result.rows[0]
}

export const obtenerHistoriasDePacienteService = async (paciente_id) => {
  const result = await pool.query(obtenerHistoriasPorPaciente, [paciente_id])
  return result.rows
}

export const obtenerResumenHistoriasMedicoService = async (medico_id) => {
    const result = await pool.query(obtenerUltimasHistoriasPorMedico, [medico_id])
    return result.rows
  }

  export const obtenerResumenHistoriasAdminService = async () => {
    const result = await pool.query(obtenerUltimasHistoriasDeTodos)
    return result.rows
  }

  export const obtenerHistoriasPacienteMedicoService = async (paciente_id, medico_id) => {
    const result = await pool.query(obtenerHistoriasPacienteAtendidoPorMedico, [paciente_id, medico_id])
    return result.rows
  }

  export const obtenerHistoriasPorPacienteService = async (paciente_id) => {
    const result = await pool.query(obtenerHistoriasPorPaciente, [paciente_id])
    return result.rows
  }

  export const actualizarHistoriaService = async (historia_id, datos) => {
    const {
      alergias, medicamento,
      nivel_glucosa, peso, estatura, imc,
      problemas_salud, recomendaciones
    } = datos
  
    const result = await pool.query(actualizarHistoriaClinica, [
      alergias,
      medicamento,
      nivel_glucosa,
      peso,
      estatura,
      imc,
      problemas_salud,
      recomendaciones,
      historia_id
    ])
  
    return result.rows[0]
  }


  export const eliminarHistoriaService = async (historia_id) => {
    const result = await pool.query(eliminarHistoriaClinica, [historia_id])
    return result.rows[0]
  }
  