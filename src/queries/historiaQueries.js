// Insertar nueva historia clínica
export const insertarHistoriaClinica = `
  INSERT INTO historias_clinicas (
    paciente_id,
    medico_id,
    especialidad_id,
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  RETURNING *
`;

// Obtener todas las historias clínicas (con datos de paciente y médico)
export const obtenerHistoriasClinicas = `
  SELECT 
    hc.id,
    hc.fecha_atencion,
    hc.alergias,
    hc.medicamento,
    hc.nivel_glucosa,
    hc.peso,
    hc.estatura,
    hc.imc,
    hc.problemas_salud,
    hc.recomendaciones,
    
    -- Paciente
    p.id AS paciente_id,
    p.nombre AS paciente_nombre,
    p.apellidos AS paciente_apellidos,
    p.cedula AS paciente_cedula,
    
    -- Médico
    m.id AS medico_id,
    m.nombre AS medico_nombre,
    m.apellidos AS medico_apellidos,
    m.email AS medico_email,

    -- Especialidad
    e.nombre AS especialidad_nombre

  FROM historias_clinicas hc
  INNER JOIN pacientes p ON hc.paciente_id = p.id
  INNER JOIN usuarios m ON hc.medico_id = m.id
  LEFT JOIN especialidades e ON hc.especialidad_id = e.id
  ORDER BY hc.fecha_atencion DESC
`;

// Obtener historias clínicas de un paciente específico
export const obtenerHistoriasPorPaciente = `
  SELECT 
    hc.id,
    hc.fecha_atencion,
    hc.alergias,
    hc.medicamento,
    hc.nivel_glucosa,
    hc.peso,
    hc.estatura,
    hc.imc,
    hc.problemas_salud,
    hc.recomendaciones,

    -- Médico
    m.id AS medico_id,
    m.nombre AS medico_nombre,
    m.apellidos AS medico_apellidos,
    m.email AS medico_email,

    -- Especialidad
    e.nombre AS especialidad_nombre

  FROM historias_clinicas hc
  INNER JOIN usuarios m ON hc.medico_id = m.id
  LEFT JOIN especialidades e ON hc.especialidad_id = e.id
  WHERE hc.paciente_id = $1
  ORDER BY hc.fecha_atencion DESC
`;

// Eliminar historia clínica
export const eliminarHistoriaClinica = `
  DELETE FROM historias_clinicas
  WHERE id = $1
`;

