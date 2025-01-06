'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      "votes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        voted_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          allowNull: false,
        },
        option_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "options",
            key: "id",
          },
          onDelete: "CASCADE",
          allowNull: false,
        },
        poll_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "polls",
            key: "id",
          },
          onDelete: "CASCADE",
          allowNull: false,
        },
      },
      {
        hooks: {
          beforeCreate: async (vote, options) => {
            const Option = queryInterface.model.Option;
            const validOption = await Option.findOne({
              where: {
                id: vote.option_id,
                poll_id: vote.poll_id,
              },
            });

            if (!validOption) {
              throw new Error("Invalid option for this poll");
            }
          },
        },
      }
    );
    //

    await queryInterface.addConstraint('votes', {
      name: 'votes_user_poll_unique',
      fields: ['user_id', 'poll_id'],
      type: 'unique'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    // await queryInterface.removeConstraint("votes", "votes_user_poll_unique");
    await queryInterface.dropTable('votes');
  }
};
