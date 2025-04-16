export const insertarCita = `
  INSERT INTO citas (paciente_id, medico_id, fecha, hora, estado, motivo)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
`

export const obtenerCitas = `
  SELECT c.*, 
         p.nombre AS paciente_nombre, 
         p.apellidos AS paciente_apellidos,
         u.nombre AS medico_nombre,
         u.apellidos AS medico_apellidos
  FROM citas c
  JOIN pacientes p ON p.id = c.paciente_id
  JOIN usuarios u ON u.id = c.medico_id
  ORDER BY c.fecha DESC, c.hora DESC
`
export const obtenerCitasPorMedico = `
  SELECT c.*, 
         p.nombre AS paciente_nombre, 
         p.apellidos AS paciente_apellidos
  FROM citas c
  JOIN pacientes p ON p.id = c.paciente_id
  WHERE c.medico_id = $1
  ORDER BY c.fecha DESC, c.hora DESC
`
