const dotenv = require('dotenv')
dotenv.config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'drone_cloud_platform',
    host: DB_HOST,
    port: 3306,
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'drone_cloud_platform',
    host: DB_HOST,
    port: 3306,
    dialect: 'mysql'
  }
}
