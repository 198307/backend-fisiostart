import {
  crearPacientePublicoService,
  crearPacienteService,
  listarPacientesService,
  listarPacientesPendientesService,
  actualizarPacienteService,
  eliminarPacienteService,registrarConSolicitudService
} from '../services/pacienteService.js'

export const crearPacientePublicoController = async (req, res) => {
  try {
    const paciente = await crearPacientePublicoService(req.body)
    res.status(201).json(paciente)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar paciente', detalle: error.message })
  }
}

export const crearPacienteController = async (req, res) => {
  try {
    const paciente = await crearPacienteService(req.body)
    res.status(201).json(paciente)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar paciente', detalle: error.message })
  }
}

export const listarPacientesController = async (req, res) => {
  try {
    const pacientes = await listarPacientesService()
    res.json(pacientes)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar pacientes', detalle: error.message })
  }
}

export const listarPacientesPendientesController = async (req, res) => {
  try {
    const pacientes = await listarPacientesPendientesService()
    res.json(pacientes)
  } catch (error) {
    res.status(500).json({ error: 'Error al listar pacientes pendientes', detalle: error.message })
  }
}

export const actualizarPacienteController = async (req, res) => {
  try {
    const paciente = await actualizarPacienteService(req.body)
    res.json(paciente)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar paciente', detalle: error.message })
  }
}

export const eliminarPacienteController = async (req, res) => {
  try {
    const { cedula } = req.params
    await eliminarPacienteService(cedula)
    res.json({ message: 'Paciente eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar paciente', detalle: error.message })
  }
}

// 🔥 Controller para registro público con solicitud
export const registrarConSolicitudController = async (req, res) => {
  try {
    const { cedula, nombre, apellidos, telefono, email, especialidad_id } = req.body

    const solicitud = await registrarConSolicitudService(
      { cedula, nombre, apellidos, telefono, email },
      especialidad_id
    )

    res.status(201).json({ message: 'Solicitud registrada exitosamente', solicitud })
  } catch (error) {
    console.error('❌ Error en registrarConSolicitudController:', error)
    res.status(500).json({ error: 'Error al registrar solicitud', detalle: error.message })
  }
}
