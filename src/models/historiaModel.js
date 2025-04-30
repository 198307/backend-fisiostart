export class HistoriaClinica {
  constructor({
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
  }) {
    this.fecha_atencion = fecha_atencion || new Date(); // Si no se envía, usa fecha actual
    this.alergias = alergias;
    this.medicamento = medicamento;
    this.nivel_glucosa = nivel_glucosa;
    this.peso = peso;
    this.estatura = estatura;
    this.imc = imc;
    this.problemas_salud = problemas_salud;
    this.recomendaciones = recomendaciones;
    this.cita_id = cita_id;
  }
}
