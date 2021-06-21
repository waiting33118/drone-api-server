import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV_VARIABLE } from '../types'

const { JWT_TOKEN_SECRET }: ENV_VARIABLE = process.env

export const encryptPlaintext = async (plainText: string) => {
  return await bcrypt.hash(plainText, 10)
}

export const compareEncryption = async (
  plainText: string,
  encryption: string
) => {
  return await bcrypt.compare(plainText, encryption)
}

export const signJwtToken = (
  expireDuration: string | number,
  payload: object
): Promise<string> | undefined => {
  if (JWT_TOKEN_SECRET) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        JWT_TOKEN_SECRET,
        { expiresIn: expireDuration },
        (err, token) => {
          if (err) reject(err)
          if (token) resolve(token)
        }
      )
    })
  }
}

export const verifyJwtToken = (token: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    if (JWT_TOKEN_SECRET) {
      jwt.verify(token, JWT_TOKEN_SECRET, (err, payload) => {
        if (err) reject(err)
        if (payload) resolve(payload)
      })
    }
  })
}
