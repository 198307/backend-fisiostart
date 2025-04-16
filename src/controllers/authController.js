import { loginUsuarioService } from '../services/authService.js'

// LOGIN
export const loginController = async (req, res) => {
  const { username, password } = req.body

  try {
    const { token, usuario } = await loginUsuarioService(username, password)

    res.status(200).json({
      mensaje: '✅ Login exitoso',
      token,
      usuario
    })
  } catch (error) {
    console.error('❌ Error en loginController:', error.message)
    res.status(401).json({
      error: error.message || 'Credenciales inválidas'
    })
  }
}

// PERFIL (requiere middleware de autenticación con req.user)
export const perfilController = async (req, res) => {
  try {
    res.json({
      mensaje: '✅ Perfil del usuario autenticado',
      usuario: req.user
    })
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener perfil',
      detalle: error.message
    })
  }
}
