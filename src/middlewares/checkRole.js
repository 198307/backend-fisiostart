export const checkRole = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' })
    }

    const rol = req.user.rol

    if (!rol) {
      return res.status(403).json({ error: 'Rol no definido en el token' })
    }

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({
        error: `Acceso denegado. Rol "${rol}" no autorizado. Se requiere uno de: ${rolesPermitidos.join(', ')}`
      })
    }

    next()
  }
}
