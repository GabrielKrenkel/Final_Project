'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empresas', {
      id: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nome: {
        type: Sequelize.STRING
      },
      endereço: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.NUMERIC
      },
      longitude: {
        type: Sequelize.NUMERIC
      },
      horario_atendimento: {
        type: Sequelize.NUMERIC
      },
      numero_contato: {
        type: Sequelize.NUMERIC
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empresas');
  }
};