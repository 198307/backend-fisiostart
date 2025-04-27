// 🔹 Pre-registro desde formulario público
export const insertarPacientePublico = `
  INSERT INTO pacientes (
    cedula,
    nombre,
    apellidos,
    telefono,
    email,
    direccion,
    fecha_nacimiento,
    sexo,
    estado
  )
  VALUES ($1, $2, $3, $4, $5, NULL, NULL, NULL, 'pendiente')
  RETURNING *
`

// 🔹 Registro completo (panel secretaria o admin)
export const insertarPaciente = `
  INSERT INTO pacientes (
    cedula,
    nombre,
    apellidos,
    direccion,
    telefono,
    email,
    fecha_nacimiento,
    sexo,
    estado
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *
`

export const obtenerPacientes = `
  SELECT * FROM pacientes ORDER BY apellidos ASC
`

export const obtenerPacientesPendientes = `
  SELECT * FROM pacientes WHERE estado = 'pendiente' ORDER BY apellidos ASC
`

export const actualizarPaciente = `
  UPDATE pacientes SET
    nombre = $1,
    apellidos = $2,
    direccion = $3,
    telefono = $4,
    email = $5,
    fecha_nacimiento = $6,
    sexo = $7,
    estado = 'completado'
  WHERE cedula = $8
  RETURNING *
`

export const eliminarPaciente = `
  DELETE FROM pacientes WHERE cedula = $1
`
// 🔍 Buscar paciente por cédula
export const buscarPacientePorCedula = `
  SELECT * FROM pacientes
  WHERE cedula = $1
`