import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import { ENV_VARIABLE } from '../types'

const { NODE_ENV }: ENV_VARIABLE = process.env

export default {
  async getUserInfo(req: Request, res: Response) {
    const userRepo = getRepository(User)
    try {
      const user = await userRepo.findOne({ where: { uuid: res.locals.uuid } })
      if (user) {
        res
          .cookie('access_token', res.locals.accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 5,
            secure: NODE_ENV === 'production',
            sameSite:'none'
          })
          .json({
            email: user.email,
            droneId: user.droneId
          })
        return
      }
      res.status(401).json({ msg: 'Unauthorize, Please login again' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal server error' })
    }
  }
}
