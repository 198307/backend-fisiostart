// 📁 src/controllers/historiaController.js

import {
  crearHistoriaClinicaService,
  listarHistoriasClinicasService,
  obtenerHistoriaPorIdService,
  actualizarHistoriaClinicaService,
  eliminarHistoriaClinicaService
} from '../services/historiaService.js'

// 🔹 Crear historia
export const crearHistoriaClinicaController = async (req, res) => {
  try {
    const historia = await crearHistoriaClinicaService(req.body)
    res.status(201).json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la historia clínica', detalle: error.message })
  }
}

// 🔹 Listar todas con JOIN
export const obtenerHistoriasClinicasController = async (req, res) => {
  try {
    const historias = await listarHistoriasClinicasService()
    res.json(historias)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historias clínicas', detalle: error.message })
  }
}

// 🔹 Obtener por ID
export const obtenerHistoriaClinicaPorIdController = async (req, res) => {
  try {
    const { id } = req.params
    const historia = await obtenerHistoriaPorIdService(id)

    if (!historia) {
      return res.status(404).json({ error: 'Historia clínica no encontrada' })
    }

    res.json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historia clínica', detalle: error.message })
  }
}

// 🔹 Actualizar
export const actualizarHistoriaClinicaController = async (req, res) => {
  try {
    const { id } = req.params
    const historia = await actualizarHistoriaClinicaService(id, req.body)
    res.json(historia)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar historia clínica', detalle: error.message })
  }
}

// 🔹 Eliminar
export const eliminarHistoriaClinicaController = async (req, res) => {
  try {
    const { id } = req.params
    await eliminarHistoriaClinicaService(id)
    res.json({ message: 'Historia clínica eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar historia clínica', detalle: error.message })
  }
}
