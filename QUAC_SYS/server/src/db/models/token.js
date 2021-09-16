'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Token.init({
    id: {
      DataTypes: UUID,
      allowNull: false
    },
    acess_token: {
      DataTypes: STRING,
      allowNull: false
    },
    refresh_token: {
      DataTypes: STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RefreshToken',
  });
  return Token;
};