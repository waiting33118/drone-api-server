'use strict'
const { authUtils } = require('../libs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'aiotlab1@ntut.org.tw',
      name: 'aiotlab1',
      password: await authUtils.encryptPassword('aiotlab208'),
      droneId: 'spojeoojjsepjkojp',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'aiotlab2@ntut.org.tw',
      name: 'aiotlab2',
      password: await authUtils.encryptPassword('aiotlab208'),
      droneId: 'efsosadfhjuikofhoes',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
