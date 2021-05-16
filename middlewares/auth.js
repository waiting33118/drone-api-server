const { authUtils, log } = require('../libs')
const db = require('../models')
const { Token } = db

module.exports = {
  async confirmLoginStatus (req, res, next) {
    const { accessToken } = req.cookies
    const { userId } = req.body

    const user = await Token.findOne({
      where: { userId }
    })

    if (user.accessToken !== accessToken) {
      res.status(403).json({
        errCode: 3001,
        reason: log.duplicateLogin()
      })
      return
    }
    next()
  },

  async verifyToken (req, res, next) {
    const { accessToken } = req.cookies

    try {
      const { userId } = await authUtils.verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
      req.body = {
        ...req.body,
        userId
      }
      next()
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
