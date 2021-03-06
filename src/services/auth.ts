import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import { compareEncryption, encryptPlaintext, signJwtToken } from '../helpers'
import { LoginField, SignupField } from '../types'
import { v4 } from 'uuid'

export default {
  /**
   * User signup
   */
  async signup(req: Request, res: Response) {
    const { email, password, checkPassword, droneId }: SignupField = req.body

    if (
      email.trim() === '' ||
      password.trim() === '' ||
      checkPassword.trim() === '' ||
      droneId.trim() === ''
    ) {
      res.status(400).json({ msg: 'Required field is empty' })
      return
    }

    if (password !== checkPassword) {
      res.status(400).json({ msg: 'Password & check password not match' })
      return
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ msg: 'Password must equal or longer than 8 character' })
      return
    }

    try {
      const userRepo = getRepository(User)
      const user = await userRepo.findOne({ where: { email } })
      if (user) {
        res.status(400).json({ msg: 'Email exist' })
        return
      }

      const encryptPassword = await encryptPlaintext(password)
      const newUser = userRepo.create({
        email,
        password: encryptPassword,
        droneId,
        uuid: v4()
      })
      await userRepo.save(newUser)
      res.status(201).json({ msg: 'User created' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal server error' })
    }
  },

  /**
   * User login
   */
  async login(req: Request, res: Response) {
    const { email, password }: LoginField = req.body

    if (email.trim() === '' || password.trim() === '') {
      res.status(400).json({ msg: 'Required field is empty' })
      return
    }

    try {
      const userRepo = getRepository(User)
      const user = await userRepo.findOne({ where: { email } })
      if (!user) {
        res.status(401).json({ msg: 'Account not found' })
        return
      }

      if (!(await compareEncryption(password, user.password))) {
        res.status(401).json({ msg: 'Invalid password ' })
        return
      }

      const accessToken = await signJwtToken('5m', { uuid: user.uuid })
      const refreshToken = await signJwtToken('30d', { uuid: user.uuid })

      res
        .cookie('access_token', accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 5,
          secure: true,
          sameSite: 'none'
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: true,
          sameSite: 'none'
        })
        .json({ msg: 'User login' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Internal server error' })
    }
  },

  /**
   * Issue new access token to the frontend for user validation
   */
  refreshToken(req: Request, res: Response) {
    res
      .cookie('access_token', res.locals.accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
        secure: true,
        sameSite: 'none'
      })
      .json({ msg: 'refreshed' })
  },

  /**
   * User logout
   */
  logout(req: Request, res: Response) {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      .clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
      })
      .send('logout')
  }
}
