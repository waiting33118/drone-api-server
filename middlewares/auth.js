const { authUtils, log } = require('../libs')
const db = require('../models')
const { Token } = db

module.exports = {
  async checkDuplicateLogin (req, res, next) {
    const { accessToken } = req.cookies
    const { userId } = req.body

    const user = await Token.findOne({
      where: { userId }
    })
    if (user.accessToken !== accessToken) {
      res.status(403).json({
        errCode: 3000,
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
        case 'TokenExpiredError': {
          res.status(401).json({
            errCode: 2001,
            reason: log.tokenExpired()
          })
          return
        }
        default: {
          res.status(401).json({
            errCode: 2002,
            reason: log.tokenError()
          })
        }
      }
    }
  }
}
