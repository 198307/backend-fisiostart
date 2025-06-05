import express from 'express'
import {
  crearUsuarioController,
  obtenerUsuariosController,
  actualizarUsuarioController,
  eliminarUsuarioController,
  buscarUsuarioPorCedulaController
} from '../controllers/usuarioControllers.js'

const router = express.Router()

// 🔹 Crear nuevo usuario (admin o secretaria)
router.post('/', crearUsuarioController)

// 🔹 Obtener todos los usuarios (admin y secretaria)
router.get('/', obtenerUsuariosController)

// 🔹 Actualizar usuario
router.put('/:id', actualizarUsuarioController)

// 🔹 Eliminar usuario
router.delete('/:id', eliminarUsuarioController)

// 🔍 Buscar usuario por cédula
router.get('/cedula/:cedula', buscarUsuarioPorCedulaController)

export default router
