"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query("SELECT id FROM users", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const polls = await queryInterface.sequelize.query("SELECT id FROM polls", {
      type: queryInterface.sequelize.QueryTypes.SELECT,
    });

    const options = await queryInterface.sequelize.query(
      "SELECT id, poll_id FROM options",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingVotes = await queryInterface.sequelize.query(
      "SELECT user_id, poll_id FROM votes",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const votesData = [];

    users.forEach((user) => {
      polls.forEach((poll) => {
        const hasVoted = existingVotes.some(
          (vote) => vote.user_id === user.id && vote.poll_id === poll.id
        );

        if (!hasVoted) {
          const pollOptions = options.filter(
            (option) => option.poll_id === poll.id
          );

          if (pollOptions.length > 0) {
            const randomOption =
              pollOptions[Math.floor(Math.random() * pollOptions.length)];

            votesData.push({
              user_id: user.id,
              option_id: randomOption.id,
              poll_id: poll.id,
              voted_at: new Date(),
            });
          }
        }
      });
    });

    if (votesData.length > 0) {
      await queryInterface.bulkInsert("votes", votesData, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("votes", null, {});
  },
};
