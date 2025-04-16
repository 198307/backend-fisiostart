export const buscarUsuarioConRolYEspecialidades = `
  SELECT 
    u.id,
    u.nombre,
    u.apellidos,
    u.username,
    u.email,
    u.password,
    json_build_object('id', r.id, 'nombre', r.nombre) AS rol,
    
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
    END AS especialidades

  FROM usuarios u
  JOIN roles r ON r.id = u.rol_id
  LEFT JOIN medicos_especialidades me ON me.usuario_id = u.id
  LEFT JOIN especialidades e ON e.id = me.especialidad_id
  WHERE u.username = $1
  GROUP BY u.id, r.id, r.nombre
`
