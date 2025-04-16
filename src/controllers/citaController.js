import { crearCitaService, obtenerCitasService,obtenerCitasPorMedicoService } from '../services/citaService.js'

export const crearCitaController = async (req, res) => {
  try {
    const nueva = await crearCitaService(req.body)
    res.status(201).json(nueva)
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar cita', detalle: error.message })
  }
}

export const listarCitasController = async (req, res) => {
  try {
    const citas = await obtenerCitasService()
    res.json(citas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas', detalle: error.message })
  }
}

export const listarCitasMedicoController = async (req, res) => {
    try {
      const medicoId = req.user.id
      const citas = await obtenerCitasPorMedicoService(medicoId)
      res.json(citas)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener citas del médico', detalle: error.message })
    }
  }
