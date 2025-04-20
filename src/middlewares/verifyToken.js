import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.warn('🔒 No se proporcionó token en la cabecera Authorization.')
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('❌ Token inválido o expirado:', err.message)
      return res.status(403).json({ error: 'Token inválido o expirado' })
    }

    // 🔍 Consola para validar que el token tiene el rol
    console.log('✅ Token verificado - usuario:', decoded)

    // Asegúrate de que `rol` está presente y es un número
    if (!decoded.rol || typeof decoded.rol !== 'number') {
      console.warn('⚠️ El token no contiene un rol válido')
      return res.status(403).json({ error: 'Rol no válido en el token' })
    }

    req.user = decoded
    next()
  })
}
