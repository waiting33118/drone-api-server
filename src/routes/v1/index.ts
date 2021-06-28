import express, { Request, Response } from 'express'
import { verifyTokens } from '../../middlewares'
import auth from '../../services/auth'
import user from '../../services/user'
const router = express.Router()

router.get('/', (req: Request, res: Response) =>
  res.json({ server: 'Running' })
)

router.post('/auth/signup', auth.signup)
router.post('/auth/login', auth.login)
router.get('/auth/token', verifyTokens, auth.refreshToken)
router.post('/auth/logout', auth.logout)

router.get('/user/me', verifyTokens, user.getUserInfo)

export default router
