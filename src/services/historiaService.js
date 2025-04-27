import pool from '../config/conex.js';
import {
  insertarHistoriaClinica,
  obtenerHistoriasClinicas,
  obtenerHistoriasPorPaciente,
  eliminarHistoriaClinica
} from '../queries/historiaQueries.js';

// 🔹 Crear una nueva historia clínica
export const crearHistoriaClinicaService = async (datos) => {
  const {
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
  } = datos;

  const result = await pool.query(insertarHistoriaClinica, [
    paciente_id,
    medico_id,
    especialidad_id,
    fecha_atencion || new Date(), // Si no envían fecha, usamos hoy
    alergias,
    medicamento,
    nivel_glucosa,
    peso,
    estatura,
    imc,
    problemas_salud,
    recomendaciones
  ]);

  return result.rows[0];
};

// Obtener todas las historias clínicas (con datos de pacientes, médicos y especialidad)
export const listarHistoriasClinicasService = async () => {
  const result = await pool.query(obtenerHistoriasClinicas);
  return result.rows;
};

// 🔹 Obtener historias de un paciente específico
export const listarHistoriasPorPacienteService = async (paciente_id) => {
  const result = await pool.query(obtenerHistoriasPorPaciente, [paciente_id]);
  return result.rows;
};

// Eliminar una historia clínica
export const eliminarHistoriaClinicaService = async (id) => {
  await pool.query(eliminarHistoriaClinica, [id]);
  return { success: true };
};
