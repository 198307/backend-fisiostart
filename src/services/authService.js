import pool from '../config/conex.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { buscarUsuarioConRolYEspecialidades } from '../queries/authQueries.js'

export const loginUsuarioService = async (username, password) => {
  const result = await pool.query(buscarUsuarioConRolYEspecialidades, [username])

  if (result.rows.length === 0) {
    throw new Error('Usuario no encontrado')
  }

  const usuario = result.rows[0]

  // Verificar contraseña
  const passwordValido = await bcrypt.compare(password, usuario.password)
  if (!passwordValido) {
    throw new Error('Contraseña incorrecta')
  }

  // Generar token con el ID del rol (no con el nombre)
  const token = jwt.sign(
    {
      id: usuario.id,
      rol: usuario.rol.id, // ✅ Se envía el ID (ej: 1, 2, 3), compatible con checkRole
      nombre: usuario.nombre,
      apellidos: usuario.apellidos
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  // Construir el objeto del usuario que se devolverá
  const usuarioFinal = {
    id: usuario.id,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    username: usuario.username,
    email: usuario.email,
    rol: usuario.rol // objeto completo: { id, nombre }
  }

  // Solo agregar especialidades si es médico
  if (usuario.rol.nombre === 'medico') {
    usuarioFinal.especialidades = usuario.especialidades
  }

  return {
    token,
    usuario: usuarioFinal
  }
}
