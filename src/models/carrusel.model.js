// 📄 src/models/carrusel.model.js
class CarruselModel {
  constructor({
    id,
    titulo_principal,
    subtitulo,
    url_imagen,
    telefono1,
    telefono2,
    orden = 1,
    visible = true,
    actualizado_por,
    actualizado_en
  }) {
    this.id = id
    this.titulo_principal = titulo_principal
    this.subtitulo = subtitulo
    this.url_imagen = url_imagen
    this.telefono1 = telefono1
    this.telefono2 = telefono2
    this.orden = orden
    this.visible = visible
    this.actualizado_por = actualizado_por
    this.actualizado_en = actualizado_en
  }
}

export default CarruselModel
