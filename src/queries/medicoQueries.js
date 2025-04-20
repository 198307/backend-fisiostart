export const insertarMedicoConEspecialidades = `
  WITH nuevo_medico AS (
    INSERT INTO usuarios (
      cedula, nombre, apellidos, telefono, email, username, password, rol_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, 1) -- 1 = rol médico
    RETURNING id
  ),
  insertadas AS (
    INSERT INTO medicos_especialidades (usuario_id, especialidad_id)
    SELECT id, unnest($8::int[]) FROM nuevo_medico
  )
  SELECT u.*
  FROM usuarios u
  WHERE u.id = (SELECT id FROM nuevo_medico)
`;


export const obtenerMedicos = `
  SELECT 
    json_strip_nulls(
      json_build_object(
        'id', u.id,
        'cedula', u.cedula,
        'nombre', u.nombre,
        'apellidos', u.apellidos,
        'telefono', u.telefono,
        'email', u.email,
        'username', u.username,
        'rol', json_build_object('id', r.id, 'nombre', r.nombre),
        'especialidades',
          CASE
            WHEN r.nombre = 'medico' THEN
              COALESCE(
                json_agg(
                  DISTINCT jsonb_build_object(
                    'id', e.id,
                    'nombre', e.nombre
                  )
                ) FILTER (WHERE e.id IS NOT NULL),
                '[]'
              )
            ELSE NULL
          END
      )
    ) AS medico
  FROM usuarios u
  JOIN roles r ON r.id = u.rol_id
  LEFT JOIN medicos_especialidades me ON me.usuario_id = u.id
  LEFT JOIN especialidades e ON e.id = me.especialidad_id
  WHERE r.nombre = 'medico'
  GROUP BY u.id, r.id, r.nombre
  ORDER BY u.apellidos, u.nombre
`

export const actualizarMedicoConEspecialidades = `
  WITH actualizado AS (
    UPDATE usuarios
    SET cedula = $2,
        nombre = $3,
        apellidos = $4,
        telefono = $5,
        email = $6,
        username = $7,
        password = COALESCE($8, password) -- solo cambia si envías password
    WHERE id = $1
    RETURNING id
  ),
  eliminado AS (
    DELETE FROM medicos_especialidades
    WHERE usuario_id = (SELECT id FROM actualizado)
  ),
  insertado AS (
    INSERT INTO medicos_especialidades (usuario_id, especialidad_id)
    SELECT (SELECT id FROM actualizado), unnest($9::int[])
  )
  SELECT u.*
  FROM usuarios u
  WHERE u.id = (SELECT id FROM actualizado)
`
export const eliminarMedico = `
  WITH eliminado_especialidades AS (
    DELETE FROM medicos_especialidades WHERE usuario_id = $1
  )
  DELETE FROM usuarios WHERE id = $1 AND rol_id = 1
`
