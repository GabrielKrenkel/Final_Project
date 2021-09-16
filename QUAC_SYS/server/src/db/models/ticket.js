'use strict';
const {
  Model, UUID
} = require('sequelize');
const { all } = require('sequelize/types/lib/operators');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ticket.init({
    id: {
      DataTypes: UUID,
      allowNull: false
    },
    expirationTime: {
      DataTypes: DATE,
      allowNull: false
    },
    ticket: {
      DataTypes: INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};