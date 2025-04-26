import {
    crearSolicitudCitaService,
    listarSolicitudesPorPacienteService,
    listarTodasSolicitudesService,
    actualizarEstadoSolicitudService,
    eliminarSolicitudCitaService
  } from '../services/solicitudService.js'
  
  // 🔹 Crear solicitud
  export const crearSolicitudCitaController = async (req, res) => {
    try {
      const { paciente_id, especialidad_id, estado } = req.body
  
      if (!paciente_id || !especialidad_id) {
        return res.status(400).json({ error: 'Datos incompletos para la solicitud' })
      }
  
      const solicitud = await crearSolicitudCitaService({ paciente_id, especialidad_id, estado })
      res.status(201).json(solicitud)
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear la solicitud de cita',
        detalle: error.message
      })
    }
  }
  
  // 🔹 Obtener todas las solicitudes (nuevo)
  export const listarTodasSolicitudesController = async (req, res) => {
    try {
      const solicitudes = await listarTodasSolicitudesService()
      res.json(solicitudes)
    } catch (error) {
      res.status(500).json({
        error: 'Error al listar todas las solicitudes',
        detalle: error.message
      })
    }
  }
  
  // 🔹 Obtener solicitudes por paciente
  export const listarSolicitudesPorPacienteController = async (req, res) => {
    try {
      const { paciente_id } = req.params
      const solicitudes = await listarSolicitudesPorPacienteService(paciente_id)
      res.json(solicitudes)
    } catch (error) {
      res.status(500).json({
        error: 'Error al listar solicitudes por paciente',
        detalle: error.message
      })
    }
  }
  
  // 🔹 Actualizar estado
  export const actualizarEstadoSolicitudController = async (req, res) => {
    try {
      const { id } = req.params
      const { estado } = req.body
  
      if (!['pendiente', 'atendida', 'cancelada'].includes(estado)) {
        return res.status(400).json({ error: 'Estado inválido' })
      }
  
      const solicitudActualizada = await actualizarEstadoSolicitudService(id, estado)
      res.json(solicitudActualizada)
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar estado de solicitud',
        detalle: error.message
      })
    }
  }
  
  // 🔹 Eliminar solicitud
  export const eliminarSolicitudCitaController = async (req, res) => {
    try {
      const { id } = req.params
      await eliminarSolicitudCitaService(id)
      res.json({ message: 'Solicitud eliminada correctamente' })
    } catch (error) {
      res.status(500).json({
        error: 'Error al eliminar la solicitud',
        detalle: error.message
      })
    }
  }
  