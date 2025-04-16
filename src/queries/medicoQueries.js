export const insertarMedico = `
  INSERT INTO usuarios (cedula, nombre, apellidos, telefono, email, username, password, rol_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
`

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
