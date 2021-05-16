const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  async encryptPassword (plainTextPassword) {
    try {
      return await bcrypt.hash(plainTextPassword, 10)
    } catch (error) {
      console.log(error.message)
    }
  },

  /**
   *
   * @param {string} password
   * @param {string} ecryptedPassword
   */
  async comparePassword (password, ecryptedPassword) {
    try {
      return await bcrypt.compare(password, ecryptedPassword)
    } catch (error) {
      console.log(error.message)
    }
  },

  /**
   *
   * @param {object} payload
   * @param {string} secret
   * @param {string} expireDuration
   */
  signToken (payload, secret, expireDuration) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, { expiresIn: expireDuration }, (err, encoded) => {
        if (err) return reject(err)
        resolve(encoded)
      })
    })
  },

  /**
   *
   * @param {string} token
   * @param {string} secret
   */
  verifyToken (token, secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  }
}
