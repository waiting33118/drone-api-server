const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/**
 * Use bcrypt to encrypt password
 * @param {string} plainPassword Plain text password
 */
const encryptPassword = async (plainPassword) => {
  try {
    return await bcrypt.hash(plainPassword, 10)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Compare password with database's password to check it's correct
 * @param {string} plainPassword User's input password
 * @param {string} hashPassword Database correct password
 * @returns A boolean that represent the password is correct or not
 */
const comparePassword = async (plainPassword, hashPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword)
  } catch (error) {
    console.log(error)
  }
}

/**
 * Generate access token
 * @param {number} userId User id need to store in payload
 */
const generateAccessToken = (userId) => {
  const payload = { userId }
  const { ACCESS_TOKEN_SECRET } = process.env

  return new Promise((resolve, reject) => {
    jwt.sign(payload,
      ACCESS_TOKEN_SECRET, {
        expiresIn: 300
      },
      (err, token) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        resolve(token)
      })
  })
}

/**
 * Generate refresh token
 * @param {number} userId User id need to store in payload
 */
const generateRefreshToken = (userId) => {
  const payload = { userId }
  const { REFRESH_TOKEN_SECRET } = process.env

  return new Promise((resolve, reject) => {
    jwt.sign(payload,
      REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) {
          console.log(err)
          return reject(err)
        }
        resolve(token)
      })
  })
}

/**
 * Verify refresh token
 * @param {string} token refresh token
 */
const verifyRefreshToken = (token) => {
  const { REFRESH_TOKEN_SECRET } = process.env
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

module.exports.encryptPassword = encryptPassword
module.exports.comparePassword = comparePassword
module.exports.generateAccessToken = generateAccessToken
module.exports.generateRefreshToken = generateRefreshToken
module.exports.verifyRefreshToken = verifyRefreshToken
