// 📌 Insertar nueva historia clínica
export const insertarHistoriaClinica = `
  INSERT INTO historias_clinicas (
    fecha_atencion,
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones,
    cita_id
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  RETURNING *
`;

// 📌 Actualizar historia clínica
export const actualizarHistoriaClinicaQuery = `
  UPDATE historias_clinicas SET
    fecha_atencion = $1,
    alergias = $2,
    medicamento = $3,
    nivel_glucosa = $4,
    peso = $5,
    estatura = $6,
    imc = $7,
    problemas_salud = $8,
    recomendaciones = $9
  WHERE id = $10
  RETURNING *
`;

// 📌 Eliminar historia clínica
export const eliminarHistoriaClinica = `
  DELETE FROM historias_clinicas
  WHERE id = $1
`;

// 📌 Obtener todas las historias con datos completos
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
    p.id AS paciente_id,
    p.nombre AS paciente_nombre,
    p.apellidos AS paciente_apellidos,
    DATE_PART('year', AGE(CURRENT_DATE, p.fecha_nacimiento)) AS edad_paciente,
    u.nombre AS medico_nombre,
    u.apellidos AS medico_apellidos,
    e.nombre AS especialidad
  FROM historias_clinicas hc
  INNER JOIN citas c ON c.id = hc.cita_id
  INNER JOIN pacientes p ON p.id = c.paciente_id
  INNER JOIN usuarios u ON u.id = c.medico_id
  LEFT JOIN especialidades e ON e.id = c.especialidad_id
  ORDER BY hc.fecha_atencion DESC
`;

// 📌 Obtener historia clínica por ID
export const obtenerHistoriaClinicaPorId = `
  SELECT 
    hc.*,
    p.id AS paciente_id,
    p.nombre AS paciente_nombre,
    p.apellidos AS paciente_apellidos,
    u.nombre AS medico_nombre,
    u.apellidos AS medico_apellidos,
    e.nombre AS especialidad
  FROM historias_clinicas hc
  INNER JOIN citas c ON c.id = hc.cita_id
  INNER JOIN pacientes p ON p.id = c.paciente_id
  INNER JOIN usuarios u ON u.id = c.medico_id
  LEFT JOIN especialidades e ON e.id = c.especialidad_id
  WHERE hc.id = $1
`;
