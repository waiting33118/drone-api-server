const { log, authUtils } = require('../libs')
const db = require('../models')
const { User, Token } = db

const authService = {
  async signUp (req, res) {
    const { email, name, password, checkPassword, droneId } = req.body

    if (
      !(email && password && droneId && checkPassword) ||
      (email.trim() === '' || password.trim() === '' || droneId.trim() === '' || checkPassword.trim() === '')
    ) {
      return res.status(400).json({
        errCode: 1000,
        reason: log.signupFieldIncorrect()
      })
    }
    if (password.length < 8) {
      return res.status(400).json({
        errCode: 1001,
        reason: log.signupPasswordLengthIncorrect()
      })
    }

    if (password !== checkPassword) {
      return res.status(400).json({
        errCode: 1002,
        reason: log.signupPasswordunMatchCheckPassword()
      })
    }

    try {
      const result = await findOrCreateUser(email, name, password, droneId)

      if (!result[1]) {
        return res.status(400).json({
          errCode: 1003,
          reason: log.signupEmailExist()
        })
      }
      res.status(201).json({
        msg: 'Create user successfully!'
      })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  },

  async signIn (req, res) {
    const { email, password } = req.body

    if (!(email && password) ||
      (email.trim() === '' || password.trim() === '')
    ) {
      return res.status(400).json({
        errCode: 1100,
        reason: log.signinFieldIncorrect()
      })
    }

    try {
      const result = await findUserIsExist(email)

      if (!result) {
        return res.status(401).json({
          errCode: 1101,
          reason: log.signinUserNotFound()
        })
      }

      if (!await authUtils.comparePassword(password, result.password)) {
        return res.status(401).json({
          errCode: 1102,
          reason: log.signinInvalidPassword()
        })
      }

      const accessToken = await authUtils.signToken({ userId: result.id }, process.env.ACCESS_TOKEN_SECRET, '10m')
      const refreshToken = await authUtils.signToken({ userId: result.id }, process.env.REFRESH_TOKEN_SECRET, '1d')

      await storeTokensInDatabase(result.id, accessToken, refreshToken)

      res
        .cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 10,
          secure: process.env.NODE_ENV === 'production'
        })
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: process.env.NODE_ENV === 'production'
        })
        .json({
          msg: 'User login!'
        })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  },

  async signOut (req, res) {
    const { userId } = req.body
    try {
      await storeTokensInDatabase(userId, '', '')
      res
        .cookie('accessToken', '', {
          httpOnly: true,
          expires: new Date(1970, 1, 1, 0, 0, 0, 0),
          secure: process.env.NODE_ENV === 'production'
        })
        .cookie('refreshToken', '', {
          httpOnly: true,
          expires: new Date(1970, 1, 1, 0, 0, 0, 0),
          secure: process.env.NODE_ENV === 'production'
        })
        .json({
          msg: 'User logout!'
        })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    }
  },

  async renewToken (req, res) {
    const { refreshToken } = req.cookies

    try {
      const { userId } = await authUtils.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const newAccessToken = await authUtils.signToken({ userId }, process.env.ACCESS_TOKEN_SECRET, '10m')
      const newRefreshToken = await authUtils.signToken({ userId }, process.env.REFRESH_TOKEN_SECRET, '1d')
      await storeTokensInDatabase(userId, newAccessToken, newRefreshToken)
      res
        .cookie('accessToken', newAccessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 10,
          secure: process.env.NODE_ENV === 'production'
        })
        .cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: process.env.NODE_ENV === 'production'
        })
        .json({
          msg: 'User refresh token!'
        })
    } catch (error) {
      switch (error.name) {
        case 'JsonWebTokenError': {
          res.status(401).json({
            errCode: 2002,
            reason: log.tokenError()
          })
          return
        }
        default: {
          console.log(error.message)
          res.status(500).json({
            msg: 'Internal Server Error'
          })
        }
      }
    }
  }
}

async function findOrCreateUser (email, name, password, droneId) {
  return await User.findOrCreate({
    where: { email },
    defaults: {
      name: name === '' ? 'Pilot' : name,
      password: await authUtils.encryptPassword(password),
      droneId
    }
  })
}

async function findUserIsExist (email) {
  return await User.findOne({
    where: { email }
  })
}

async function storeTokensInDatabase (userId, accessToken, refreshToken) {
  const result = await Token.findOne({ where: { userId } })
  if (!result) {
    await Token.create({
      userId,
      accessToken,
      refreshToken
    })
    return
  }

  await Token.update({
    accessToken,
    refreshToken
  }, {
    where: {
      userId
    }
  })
}

module.exports = authService
