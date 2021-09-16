'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Empresas.init({
    id: {
      DataTypes: UUID,
      allowNull: false
    },
    nome: {
      DataTypes: STRING,
      allowNull: false
    },
    endereço: { 
      DataTypes: STRING,
      allowNull: false
    },
    latitude: {
      DataTypes: NUMERIC,
      allowNull:false
    },
    longitude: {
      DataTypes: NUMERIC,
      allowNull: false
    },
    horario_atendimento: {
      DataTypes: NUMERIC,
      allowNull: false
    },
    numero_contato: {
      DataTypes: NUMERIC,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Empresas',
  });
  return Empresas;
};