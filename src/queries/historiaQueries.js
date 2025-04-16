export const insertarHistoriaClinica = `
  INSERT INTO historias_clinicas (
    paciente_id, fecha_atencion, alergias, medicamento,
    nivel_glucosa, peso, estatura, imc,
    problemas_salud, recomendaciones
  )
  VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *
`

export const obtenerHistoriasPorPaciente = `
  SELECT * FROM historias_clinicas
  WHERE paciente_id = $1
  ORDER BY fecha_atencion DESC
`

export const obtenerUltimasHistoriasPorMedico = `
  SELECT hc.*
  FROM historias_clinicas hc
  JOIN pacientes p ON p.id = hc.paciente_id
  WHERE hc.paciente_id IN (
    SELECT DISTINCT c.paciente_id
    FROM citas c
    WHERE c.medico_id = $1
  )
  AND hc.fecha_atencion = (
    SELECT MAX(fecha_atencion)
    FROM historias_clinicas
    WHERE paciente_id = hc.paciente_id
  )
  ORDER BY hc.fecha_atencion DESC
`

export const obtenerUltimasHistoriasDeTodos = `
  SELECT DISTINCT ON (paciente_id) *
  FROM historias_clinicas
  ORDER BY paciente_id, fecha_atencion DESC
`
export const obtenerHistoriasPacienteAtendidoPorMedico = `
  SELECT hc.*
  FROM historias_clinicas hc
  WHERE hc.paciente_id = $1
    AND hc.paciente_id IN (
      SELECT DISTINCT c.paciente_id
      FROM citas c
      WHERE c.medico_id = $2
    )
  ORDER BY hc.fecha_atencion DESC
`
export const actualizarHistoriaClinica = `
  UPDATE historias_clinicas
  SET
    alergias = $1,
    medicamento = $2,
    nivel_glucosa = $3,
    peso = $4,
    estatura = $5,
    imc = $6,
    problemas_salud = $7,
    recomendaciones = $8
  WHERE id = $9
  RETURNING *
`
export const eliminarHistoriaClinica = `
  DELETE FROM historias_clinicas
  WHERE id = $1
  RETURNING *
`
