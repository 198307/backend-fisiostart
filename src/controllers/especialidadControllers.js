import { listarEspecialidadesService } from '../services/especialidadServices.js'

export const listarEspecialidadesController = async (req, res) => {
  try {
    const especialidades = await listarEspecialidadesService()
    res.json(especialidades)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener especialidades' })
  }
}
