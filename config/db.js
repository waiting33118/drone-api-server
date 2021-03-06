const { Sequelize } = require('sequelize')
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize({
  host: DB_HOST,
  port: 3306,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: 'mysql'

})

module.exports = sequelize
