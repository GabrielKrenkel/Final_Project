'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      this.hasOne(models.RefreshToken, { foreignKey: "empresa_id" });
      this.hasMany(models.Ticket, { foreignKey: "empresa_id" });
    }


    isPasswordValid(password) {
      return bcrypt.compareSync(password, this.password);
    }
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        email: undefined,
        role: undefined
      }
    }   

  };
  Empresa.init({
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
      allowNull: false,
      set(password) {
        this.setDataValue("password", bcrypt.hashSync(password, 10));
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["moderador"]]
      }
    }
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};