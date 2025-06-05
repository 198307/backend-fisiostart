// 📄 src/routes/carruselRoutes.js
import { Router } from 'express'
import {
  getSlidesAdmin,
  getSlidesPublicos,
  crearSlide,
  actualizarSlide,
  eliminarSlide,
  ocultarSlide
} from '../controllers/carruselController.js'

import { verifyToken } from '../middlewares/verifyToken.js'
import { checkRole } from '../middlewares/checkRole.js'
import upload from '../middlewares/upload.middleware.js'

const router = Router()

// 🔓 Público: Ver solo los visibles
router.get('/public', getSlidesPublicos)

// 🔐 Admin / Secretaria
router.get('/', verifyToken, checkRole(['administrador', 'secretaria']), getSlidesAdmin)

router.post(
  '/',
  verifyToken,
  checkRole(['administrador', 'secretaria']),
  upload.single('imagen'),
  crearSlide
)

router.put(
  '/:id',
  verifyToken,
  checkRole(['administrador', 'secretaria']),
  upload.single('imagen'),
  actualizarSlide
)

router.delete(
  '/:id',
  verifyToken,
  checkRole(['administrador', 'secretaria']),
  eliminarSlide
)

router.patch(
  '/:id/ocultar',
  verifyToken,
  checkRole(['administrador', 'secretaria']),
  ocultarSlide
)

export default router
