import { crearMedicoService, obtenerMedicosService } from '../services/medicoServices.js'

export const crearMedicoController = async (req, res) => {
  try {
    const nuevoMedico = await crearMedicoService(req.body)
    res.status(201).json(nuevoMedico)
  } catch (err) {
    res.status(500).json({ error: 'Error al crear médico', detalle: err.message })
  }
}

export const listarMedicosController = async (req, res) => {
  try {
    const medicos = await obtenerMedicosService()
    res.json(medicos)
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener médicos', detalle: err.message })
  }
}
