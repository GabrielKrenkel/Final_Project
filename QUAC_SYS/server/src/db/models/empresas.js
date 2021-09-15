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
    nome: DataTypes.STRING,
    endereço: DataTypes.STRING,
    latitude: DataTypes.NUMERIC,
    longitude: DataTypes.NUMERIC,
    horario - atendimento: DataTypes.NUMERIC,
    numero - contato: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Empresas',
  });
  return Empresas;
};