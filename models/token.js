'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Token.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  Token.init({
    userId: {
      type: DataTypes.INTEGER
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    accessToken: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Token'
  })
  return Token
}
