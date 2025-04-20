import pool from '../config/conex.js'
import { obtenerEspecialidades } from '../queries/especialidadQueries.js'

export const listarEspecialidadesService = async () => {
  const result = await pool.query(obtenerEspecialidades)
  return result.rows
}
