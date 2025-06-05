import pool from '../config/conex.js'
import CarruselModel from '../models/carrusel.model.js'
import {
  insertarSlide,
  actualizarSlide,
  eliminarSlide,
  ocultarSlide,
  obtenerTodosSlides,
  obtenerSlidesVisibles
} from '../queries/carrusel.queries.js'

// 🔹 Obtener todos los slides (para admin)
export const serviceObtenerTodosSlides = async () => {
  const result = await pool.query(obtenerTodosSlides)
  return result.rows.map(row => new CarruselModel(row))
}

// 🔹 Obtener solo los visibles (para frontend)
export const serviceObtenerSlidesVisibles = async () => {
  const result = await pool.query(obtenerSlidesVisibles)
  return result.rows.map(row => new CarruselModel(row))
}

// 🔹 Insertar nuevo slide
export const serviceInsertarSlide = async ({
  titulo_principal,
  subtitulo,
  url_imagen,
  telefono1,
  telefono2,
  orden,
  visible,
  actualizado_por
}) => {
  const values = [
    titulo_principal,
    subtitulo,
    url_imagen,
    telefono1,
    telefono2,
    orden || 1,
    visible ?? true,
    actualizado_por
  ]
  const result = await pool.query(insertarSlide, values)
  return new CarruselModel(result.rows[0])
}

// 🔹 Actualizar slide existente
export const serviceActualizarSlide = async (id, {
  titulo_principal,
  subtitulo,
  url_imagen,
  telefono1,
  telefono2,
  orden,
  visible,
  actualizado_por
}) => {
  const values = [
    titulo_principal,
    subtitulo,
    url_imagen,
    telefono1,
    telefono2,
    orden,
    visible,
    actualizado_por,
    id
  ]
  const result = await pool.query(actualizarSlide, values)
  return new CarruselModel(result.rows[0])
}

// 🔹 Eliminar completamente un slide
export const serviceEliminarSlide = async (id) => {
  const result = await pool.query(eliminarSlide, [id])
  return new CarruselModel(result.rows[0])
}

// 🔹 Ocultar un slide sin eliminarlo
export const serviceOcultarSlide = async (id, actualizado_por) => {
  const result = await pool.query(ocultarSlide, [id, actualizado_por])
  return new CarruselModel(result.rows[0])
}
