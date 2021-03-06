const jwt = require('jsonwebtoken')

const checkAuthenticate = (req, res, next) => {
  const { ACCESS_TOKEN_SECRET } = process.env
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      status: 'error',
      errCode: 703,
      msg: 'Access token missing!'
    })
  }

  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      const { name } = err
      if (name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          errCode: 704,
          msg: 'Access token Expired!'
        })
      }
      if (name === 'JsonWebTokenError') {
        return res.status(401).json({
          status: 'error',
          errCode: 705,
          msg: 'Access Token Error!'
        })
      }
    }
    next()
  })
}

module.exports.checkAuthenticate = checkAuthenticate
