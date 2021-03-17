const {
  encryptPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../helpers')
const db = require('../models')
const { User } = db

const authService = {
  async signUp (req, res) {
    const { email, name, password, droneId } = req.body

    if (email === '' || name === '' || password === '') {
      return res.status(400).json({
        status: 'error',
        errCode: 600,
        msg: 'Email,Name,Password are required!'
      })
    }
    if (password.length < 8) {
      return res.status(400).json({
        status: 'error',
        errCode: 601,
        msg: 'Password must longer than 8 characters!'
      })
    }

    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          name,
          password: await encryptPassword(password),
          droneId
        }
      })
      if (!created) {
        return res.status(400).json({
          status: 'error',
          errCode: 602,
          msg: 'Email exsit!'
        })
      }
      res.status(201).json({
        status: 'success',
        msg: 'User created!',
        user
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  },

  async signIn (req, res) {
    const { email, password } = req.body

    if (email === '' || password === '') {
      return res.status(400).json({
        status: 'error',
        errCode: 700,
        msg: 'Email, Password are required!'
      })
    }

    try {
      const result = await User.findOne({ where: { email }, raw: true })
      if (!result) {
        return res.status(401).json({
          status: 'error',
          errCode: 701,
          msg: 'User not found!'
        })
      }
      if (!await comparePassword(password, result.password)) {
        return res.status(401).json({
          status: 'error',
          errCode: 702,
          msg: 'Wrong password!'
        })
      }

      res.json({
        status: 'success',
        msg: 'Sign in successfully!',
        accessToken: await generateAccessToken(result.id),
        refreshToken: await generateRefreshToken(result.id),
        user: {
          id: result.id,
          email: result.email,
          name: result.name,
          droneId: result.droneId
        }
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  },

  async refreshAccessToken (req, res) {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(403).json({
        status: 'error',
        errCode: 706,
        msg: 'Refresh token missing!'
      })
    }

    try {
      const payload = await verifyRefreshToken(refreshToken)
      res.json({
        status: 'success',
        msg: 'Refresh access token successfully!',
        accessToken: await generateAccessToken(payload.userId)
      })
    } catch ({ name }) {
      if (name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          errCode: 707,
          msg: 'Refresh Token Expired!'
        })
      }
      if (name === 'JsonWebTokenError') {
        return res.status(401).json({
          status: 'error',
          errCode: 708,
          msg: 'Refresh Token Error!'
        })
      }
    }
  },

  async fetchUserInfo (req, res) {
    const { userId } = req.body

    try {
      const { id, name, email, droneId } = await User.findByPk(userId, { raw: true })
      res.json({
        id,
        name,
        email,
        droneId
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error!' })
    }
  }

}

module.exports = authService
