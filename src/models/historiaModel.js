export class HistoriaClinica {
  constructor({
    paciente_id,
    medico_id,
    especialidad_id = null,
    fecha_atencion = new Date(), // Por defecto: fecha actual
    alergias = null,
    medicamento = null,
    nivel_glucosa = null,
    peso = null,
    estatura = null,
    imc = null,
    problemas_salud = null,
    recomendaciones = null
  }) {
    this.paciente_id = paciente_id
    this.medico_id = medico_id
    this.especialidad_id = especialidad_id
    this.fecha_atencion = fecha_atencion
    this.alergias = alergias
    this.medicamento = medicamento
    this.nivel_glucosa = nivel_glucosa
    this.peso = peso
    this.estatura = estatura
    this.imc = imc
    this.problemas_salud = problemas_salud
    this.recomendaciones = recomendaciones
  }
}
