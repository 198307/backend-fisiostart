import { crearHistoriaService, obtenerHistoriasDePacienteService,
    obtenerResumenHistoriasMedicoService,obtenerResumenHistoriasAdminService,
    obtenerHistoriasPacienteMedicoService, obtenerHistoriasPorPacienteService,
    actualizarHistoriaService
} from '../services/historiaService.js'

export const crearHistoriaController = async (req, res) => {
  try {
    const nuevaHistoria = await crearHistoriaService(req.body)
    res.status(201).json(nuevaHistoria)
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar historia clínica', detalle: error.message })
  }
}

export const listarHistoriasPorPacienteController = async (req, res) => {
  try {
    const historias = await obtenerHistoriasDePacienteService(req.params.paciente_id)
    res.json(historias)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historias', detalle: error.message })
  }
}

export const resumenHistoriasMedicoController = async (req, res) => {
    try {
      const resumen = await obtenerResumenHistoriasMedicoService(req.user.id)
      res.json(resumen)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener resumen de historias clínicas', detalle: error.message })
    }
  }

  export const resumenHistoriasAdminController = async (req, res) => {
    try {
      const resumen = await obtenerResumenHistoriasAdminService()
      res.json(resumen)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener resumen de historias para admins', detalle: error.message })
    }
  }

  export const historiasPorPacienteYMedicoController = async (req, res) => {
    try {
      const paciente_id = req.params.paciente_id
      const medico_id = req.user.id
      const historias = await obtenerHistoriasPacienteMedicoService(paciente_id, medico_id)
  
      if (historias.length === 0) {
        return res.status(403).json({ error: 'No tienes autorización para ver este historial clínico.' })
      }
  
      res.json(historias)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener historias del paciente', detalle: error.message })
    }
  }

  export const historiasPorPacienteAdminController = async (req, res) => {
    try {
      const paciente_id = req.params.paciente_id
      const historias = await obtenerHistoriasPorPacienteService(paciente_id)
      res.json(historias)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener historias del paciente', detalle: error.message })
    }
  }

  export const actualizarHistoriaController = async (req, res) => {
    try {
      const historia_id = req.params.id
      const actualizada = await actualizarHistoriaService(historia_id, req.body)
      res.json(actualizada)
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar historia clínica', detalle: error.message })
    }
  }