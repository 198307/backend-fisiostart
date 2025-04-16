export class HistoriaClinica {
    constructor({ paciente_id, alergias, medicamento, nivel_glucosa, peso, estatura, imc, problemas_salud, recomendaciones }) {
      this.paciente_id = paciente_id
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
  