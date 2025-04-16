export class Cita {
    constructor({ paciente_id, medico_id, fecha, hora, estado, motivo }) {
      this.paciente_id = paciente_id
      this.medico_id = medico_id
      this.fecha = fecha
      this.hora = hora
      this.estado = estado || 'pendiente'
      this.motivo = motivo
    }
  }
  