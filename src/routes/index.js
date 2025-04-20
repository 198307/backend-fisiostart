import { Router } from 'express'
import medicoRoutes from './medicoRoutes.js'
import authRoutes from './authRoutes.js'
import pacienteRoutes from './pacienteRoutes.js'
import citaRoutes from './citaRoutes.js'
import historiaRoutes from './historiaRoutes.js'
import especialidadRoutes from './especialidadRoutes.js'


const router = Router()

router.use('/medicos', medicoRoutes)
router.use('/', authRoutes)
router.use('/pacientes', pacienteRoutes)
router.use('/citas', citaRoutes)
router.use('/historias', historiaRoutes)
router.use('/especialidades', especialidadRoutes)

export default router
