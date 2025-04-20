import {
  crearMedicoService,
  obtenerMedicosService,
  actualizarMedicoService,
  eliminarMedicoService
} from '../services/medicoServices.js'

// Crear médico
export const crearMedicoController = async (req, res) => {
  try {
    const nuevoMedico = await crearMedicoService(req.body)
    res.status(201).json(nuevoMedico)
  } catch (error) {
    console.error('❌ Error al crear médico:', error)
    res.status(500).json({
      error: 'Error al crear médico',
      detalle: error.message
    })
  }
}

// Listar médicos
export const listarMedicosController = async (req, res) => {
  try {
    const medicos = await obtenerMedicosService()
    res.json(medicos)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener médicos', detalle: err.message })
  }
}

// Actualizar médico
export const actualizarMedicoController = async (req, res) => {
  try {
    const { id } = req.params
    const medicoActualizado = await actualizarMedicoService(id, req.body)
    res.json(medicoActualizado)
  } catch (error) {
    console.error('❌ Error al actualizar médico:', error)
    res.status(500).json({
      error: 'Error al actualizar médico',
      detalle: error.message
    })
  }
}

// Eliminar médico
export const eliminarMedicoController = async (req, res) => {
  try {
    const { id } = req.params
    const resultado = await eliminarMedicoService(id)
    res.json(resultado)
  } catch (error) {
    console.error('❌ Error al eliminar médico:', error)
    res.status(500).json({
      error: 'Error al eliminar médico',
      detalle: error.message
    })
  }
}
