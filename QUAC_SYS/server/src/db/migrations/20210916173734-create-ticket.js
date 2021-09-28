'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      expiration_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      empresa_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "empresas",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      ticket: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('tickets');
  }
};