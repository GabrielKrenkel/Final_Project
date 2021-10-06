'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      this.belongsTo(models.Empresa, { foreignKey: "empresa_id", as: "empresa" });
    }
  };
  Ticket.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    expirationTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ticket: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};