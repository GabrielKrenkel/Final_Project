'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresas extends Model {
    static associate(models) {
      this.hasMany(models.Ticket, { foreignKey: "empresa_id" });
    }
  };
  Empresas.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.NUMERIC,
      allowNull:false
    },
    longitude: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    horario_atendimento: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    numero_contato: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["moderador"]]
      }
    }
  }, {
    sequelize,
    modelName: 'Empresas',
  });
  return Empresas;
};