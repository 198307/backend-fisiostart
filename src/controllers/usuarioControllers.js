import {
  crearUsuarioService,
  obtenerUsuariosService,
  actualizarUsuarioService,
  eliminarUsuarioService,
  buscarUsuarioPorCedulaService
} from '../services/usuarioService.js'

// 🔹 Crear nuevo usuario (admin o secretaria)
export const crearUsuarioController = async (req, res) => {
  try {
    const nuevoUsuario = await crearUsuarioService(req.body)
    res.status(201).json(nuevoUsuario)
  } catch (err) {
    console.error('Error al crear usuario:', err)
    res.status(500).json({ error: 'Error al crear el usuario' })
  }
}

// 🔹 Obtener todos los usuarios (admin y secretaria)
export const obtenerUsuariosController = async (_req, res) => {
  try {
    const usuarios = await obtenerUsuariosService()
    res.json(usuarios)
  } catch (err) {
    console.error('Error al obtener usuarios:', err)
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// 🔹 Actualizar usuario
export const actualizarUsuarioController = async (req, res) => {
  const { id } = req.params
  try {
    const usuarioActualizado = await actualizarUsuarioService(id, req.body)
    res.json(usuarioActualizado)
  } catch (err) {
    console.error('Error al actualizar usuario:', err)
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

// 🔹 Eliminar usuario
export const eliminarUsuarioController = async (req, res) => {
  const { id } = req.params
  const { rol_id } = req.body
  try {
    const resultado = await eliminarUsuarioService(id, rol_id)
    res.json(resultado)
  } catch (err) {
    console.error('Error al eliminar usuario:', err)
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}

// 🔍 Buscar usuario por cédula
export const buscarUsuarioPorCedulaController = async (req, res) => {
  const { cedula } = req.params
  try {
    const usuario = await buscarUsuarioPorCedulaService(cedula)
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(usuario)
  } catch (err) {
    console.error('Error al buscar usuario por cédula:', err)
    res.status(500).json({ error: 'Error interno al buscar usuario' })
  }
}
