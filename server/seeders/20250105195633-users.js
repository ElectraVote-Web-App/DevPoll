"use strict";
const bcrypt = require("bcryptjs");


/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "user1",
          email: "user1@example.com",
          password: password,
          img: "avatar1.png",
          created_at: Sequelize.literal("NOW()"),
        },
        {
          username: "user2",
          email: "user2@example.com",
          password: password,
          img: "avatar2.png",
          created_at: Sequelize.literal("NOW()"),
        },
        {
          username: "user3",
          email: "user3@example.com",
          password: password,
          img: "avatar3.png",
          created_at: Sequelize.literal("NOW()"),
        },
        {
          username: "user4",
          email: "user4@example.com",
          password: password,
          img: "avatar4.png",
          created_at: Sequelize.literal("NOW()"),
        },
        {
          username: "user5",
          email: "user5@example.com",
          password: password,
          img: "avatar5.png",
          created_at: Sequelize.literal("NOW()"),
        },
        {
          username: "user6",
          email: "user6@example.com",
          password: password,
          img: "avatar6.png",
          created_at: Sequelize.literal("NOW()"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
