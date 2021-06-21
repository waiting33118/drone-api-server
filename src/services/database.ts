import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from '../entity/User'
import { ENV_VARIABLE } from '../types'

const {
  MYSQL_HOSTNAME,
  MYSQL_PORT = '3306',
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  NODE_ENV
}: ENV_VARIABLE = process.env

export default async () => {
  try {
    await createConnection({
      type: 'mysql',
      host: MYSQL_HOSTNAME,
      port: +MYSQL_PORT,
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: 'drone_cloud',
      entities: [User],
      synchronize: NODE_ENV !== 'production'
    })
    console.log('Connect to database successfully')
  } catch (error) {
    console.log(error)
  }
}
