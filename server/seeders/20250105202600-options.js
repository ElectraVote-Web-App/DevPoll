"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const polls = await queryInterface.sequelize.query("SELECT id FROM polls", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const optionsData = [];

    polls.forEach((poll, index) => {
      const numOptions = (index % 3) + 2;

      for (let i = 1; i <= numOptions; i++) {
        optionsData.push({
          content: `Option ${i} for Poll ${poll.id}`,
          poll_id: poll.id,
        });
      }
    });

    await queryInterface.bulkInsert("options", optionsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("options", null, {});
  },
};
