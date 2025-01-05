'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('options', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      poll_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'polls',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
    }),


    // 
    await queryInterface.addConstraint('options', {
      fields: ['content', 'poll_id'],
      type: 'unique',
      name: 'options_content_poll_id_unique',
      customIndex: true,
      length: {
        content: 191,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.removeConstraint('options', "options_content_poll_id_unique");
    await queryInterface.dropTable('options');
  }
};
