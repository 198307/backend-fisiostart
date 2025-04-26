// Este sería el modelo de una SolicitudCita

export class SolicitudCita {
    constructor({ id, paciente_id, especialidad_id, estado = 'pendiente', fecha_solicitud = new Date() }) {
      this.id = id; // opcional, autogenerado
      this.paciente_id = paciente_id;
      this.especialidad_id = especialidad_id;
      this.estado = estado;
      this.fecha_solicitud = fecha_solicitud;
    }
  }
  