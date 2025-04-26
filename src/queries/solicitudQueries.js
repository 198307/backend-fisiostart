// 📄 Consultas SQL relacionadas a la tabla solicitudes_cita

// Insertar nueva solicitud
export const insertarSolicitudCita = `
  INSERT INTO solicitudes_cita (
    paciente_id,
    especialidad_id,
    estado
  )
  VALUES ($1, $2, COALESCE($3, 'pendiente'))
  RETURNING *
`;

// Obtener todas las solicitudes de un paciente (individual)
export const obtenerSolicitudesPorPaciente = `
  SELECT 
    s.id,
    s.paciente_id,
    s.especialidad_id,
    e.nombre AS especialidad_nombre,
    s.estado,
    s.fecha_solicitud
  FROM 
    solicitudes_cita s
  JOIN 
    especialidades e ON s.especialidad_id = e.id
  WHERE 
    s.paciente_id = $1
  ORDER BY 
    s.fecha_solicitud DESC
`;

// 🔥 Obtener TODAS las solicitudes (con datos del paciente y especialidad)
export const obtenerTodasSolicitudes = `
  SELECT 
    s.id,
    s.estado,
    s.fecha_solicitud,
    s.paciente_id,
    s.especialidad_id,
    p.nombre AS paciente_nombre,
    p.apellidos AS paciente_apellidos,
    e.nombre AS especialidad_nombre
  FROM 
    solicitudes_cita s
  JOIN 
    pacientes p ON s.paciente_id = p.id
  JOIN 
    especialidades e ON s.especialidad_id = e.id
  ORDER BY 
    s.fecha_solicitud DESC
`;

// Actualizar estado
export const actualizarEstadoSolicitud = `
  UPDATE solicitudes_cita
  SET estado = $1
  WHERE id = $2
  RETURNING *
`;

// Eliminar solicitud
export const eliminarSolicitudCita = `
  DELETE FROM solicitudes_cita
  WHERE id = $1
`;
