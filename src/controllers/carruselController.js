import {
  serviceObtenerTodosSlides,

  serviceInsertarSlide,
  serviceActualizarSlide,
  serviceEliminarSlide,
  serviceOcultarSlide,
  serviceObtenerSlidesVisibles
} from '../services/carruselService.js';



// 🔹 GET /api/carrusel (admin)
export const getSlidesAdmin = async (req, res) => {
  try {
    const slides = await serviceObtenerTodosSlides();
    res.json(slides);
  } catch (error) {
    console.error('Error al obtener slides:', error);
    res.status(500).json({ error: 'Error interno al obtener los slides' });
  }
};

// 🔹 GET /api/carrusel/public (frontend)


// 🔹 POST /api/carrusel (admin)
export const crearSlide = async (req, res) => {
  try {
    const { titulo_principal, subtitulo, telefono1, telefono2, orden, visible } = req.body;
    console.log('📦 Datos recibidos en el backend:', req.body)

    const archivo = req.file;

    if (!archivo) {
      return res.status(400).json({ error: 'Imagen requerida' });
    }

    const url_imagen = `/uploads/img/${archivo.filename}`;
    const actualizado_por = req.user.id; // suponiendo que tienes auth middleware

    const nuevoSlide = await serviceInsertarSlide({
      titulo_principal,
      subtitulo,
      url_imagen,
      telefono1,
      telefono2,
      orden,
      visible,
      actualizado_por
    });

    res.status(201).json(nuevoSlide);
  } catch (error) {
    console.error('Error al crear slide:', error);
    res.status(500).json({ error: 'Error al crear el slide' });
  }
};

// 🔹 PUT /api/carrusel/:id (admin)
export const actualizarSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo_principal, subtitulo, telefono1, telefono2, orden, visible } = req.body;
    const archivo = req.file;

    const url_imagen = archivo ? `/uploads/img/${archivo.filename}` : null;
    const actualizado_por = req.user.id;

    const slideActualizado = await serviceActualizarSlide(id, {
      titulo_principal,
      subtitulo,
      url_imagen,
      telefono1,
      telefono2,
      orden,
      visible,
      actualizado_por
    });

    res.json(slideActualizado);
  } catch (error) {
    console.error('Error al actualizar slide:', error);
    res.status(500).json({ error: 'Error al actualizar el slide' });
  }
};

// 🔹 DELETE /api/carrusel/:id (admin)
export const eliminarSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await serviceEliminarSlide(id);
    res.json(eliminado);
  } catch (error) {
    console.error('Error al eliminar slide:', error);
    res.status(500).json({ error: 'Error al eliminar el slide' });
  }
};

// 🔹 PATCH /api/carrusel/:id/ocultar (admin)
export const ocultarSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado_por = req.user.id;
    const ocultado = await serviceOcultarSlide(id, actualizado_por);
    res.json(ocultado);
  } catch (error) {
    console.error('Error al ocultar slide:', error);
    res.status(500).json({ error: 'Error al ocultar el slide' });
  }
};


export const getSlidesPublicos = async (req, res) => {
  try {
    const slides = await serviceObtenerSlidesVisibles()

    const baseUrl = `${req.protocol}://${req.get('host')}`
    const slidesConRuta = slides.map(slide => {
      slide.url_imagen = slide.url_imagen?.startsWith('http')
        ? slide.url_imagen
        : `${baseUrl}${slide.url_imagen.startsWith('/') ? '' : '/'}${slide.url_imagen}`
      return slide
    })

    res.json(slidesConRuta)
  } catch (error) {
    console.error('❌ Error al obtener slides públicos:', error)
    res.status(500).json({ error: 'Error al obtener los slides públicos' })
  }
};