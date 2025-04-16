export const insertarPaciente = `
  INSERT INTO pacientes (cedula, nombre, apellidos, direccion, telefono, email, fecha_nacimiento, sexo)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
`

export const obtenerPacientes = `
  SELECT * FROM pacientes ORDER BY apellidos ASC
`
