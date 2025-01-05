"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const users = await queryInterface.sequelize.query("SELECT id FROM users", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const pollsData = users.map((user, index) => ({
      title: `Poll ${index + 1}`,
      end_time: new Date(Date.now() + (7 + index * 7) * 24 * 60 * 60 * 1000),
      type: index % 2 === 0 ? "sondage" : "vote",
      description: `Description for poll ${index + 1}`,
      created_by: user.id,
    }));

    await queryInterface.bulkInsert("polls", pollsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("polls", null, {});
  },
};
