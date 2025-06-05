// 🔹 Insertar nuevo slide del carrusel
export const insertarSlide = `
  INSERT INTO carrusel_web (
    titulo_principal,
    subtitulo,
    url_imagen,
    telefono1,
    telefono2,
    orden,
    visible,
    actualizado_por
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *
`;

// 🔹 Actualizar slide del carrusel
export const actualizarSlide = `
  UPDATE carrusel_web SET
    titulo_principal = $1,
    subtitulo = $2,
    url_imagen = COALESCE($3, url_imagen),
    telefono1 = $4,
    telefono2 = $5,
    orden = $6,
    visible = $7,
    actualizado_por = $8,
    actualizado_en = now()
  WHERE id = $9
  RETURNING *
`;

// 🔹 Eliminar completamente un slide del carrusel
export const eliminarSlide = `
  DELETE FROM carrusel_web
  WHERE id = $1
  RETURNING *
`;

// 🔹 Ocultar (desactivar) un slide sin eliminarlo
export const ocultarSlide = `
  UPDATE carrusel_web SET
    visible = false,
    actualizado_por = $2,
    actualizado_en = now()
  WHERE id = $1
  RETURNING *
`;

// 🔹 Obtener todos los slides (administración)
export const obtenerTodosSlides = `
  SELECT * FROM carrusel_web
  ORDER BY orden ASC
`;

// 🔹 Obtener solo los visibles (para el frontend)
export const obtenerSlidesVisibles = `
  SELECT * FROM carrusel_web
  WHERE visible = true
  ORDER BY orden ASC
`;
