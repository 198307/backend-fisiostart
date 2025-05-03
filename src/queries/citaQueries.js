// 📄 src/queries/citaQueries.js

// Crear nueva cita
export const insertarCita = `
  INSERT INTO citas (
    paciente_id,
    medico_id,
    especialidad_id,
    fecha,
    hora,
    estado,
    motivo
  )
  VALUES ($1, $2, $3, $4, $5, COALESCE($6, 'programada'), $7)
  RETURNING *
`;

// Listar todas las citas (modo Admin o Secretaria) 🛡️
export const obtenerCitas = `
  SELECT 
    c.id,
    c.paciente_id, -- ✅ necesario para relaciones posteriores
    p.nombre || ' ' || p.apellidos AS paciente_nombre,
    u.nombre || ' ' || u.apellidos AS medico_nombre,
    e.nombre AS especialidad_nombre,
    c.fecha,
    c.hora,
    c.estado,
    c.motivo
  FROM citas c
  JOIN pacientes p ON p.id = c.paciente_id
  LEFT JOIN usuarios u ON u.id = c.medico_id
  LEFT JOIN especialidades e ON e.id = c.especialidad_id
  ORDER BY c.fecha DESC, c.hora DESC
`;

// Listar citas de UN médico específico 🎯
export const obtenerCitasPorMedico = `
  SELECT 
    c.id,
    c.paciente_id, -- ✅ incluir aquí también
    p.nombre || ' ' || p.apellidos AS paciente_nombre,
    u.nombre || ' ' || u.apellidos AS medico_nombre,
    e.nombre AS especialidad_nombre,
    c.fecha,
    c.hora,
    c.estado,
    c.motivo
  FROM citas c
  JOIN pacientes p ON p.id = c.paciente_id
  LEFT JOIN usuarios u ON u.id = c.medico_id
  LEFT JOIN especialidades e ON e.id = c.especialidad_id
  WHERE c.medico_id = $1
  ORDER BY c.fecha DESC, c.hora DESC
`;

// Actualizar estado de la cita
export const actualizarEstadoCita = `
  UPDATE citas
  SET estado = $1
  WHERE id = $2
  RETURNING *
`;

// Eliminar cita
export const eliminarCita = `
  DELETE FROM citas
  WHERE id = $1
`;
