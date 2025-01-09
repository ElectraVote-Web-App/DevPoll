"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker"); 

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password", salt);
    const users = [];

    // Number of users to seed
    const numberOfUsers = 10;

    for (let i = 1; i <= numberOfUsers; i++) {
      const avatarNumber = (i % 6) + 1;
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: password,
        img: `avatar${avatarNumber}.png`,
        created_at: Sequelize.literal("NOW()"),
      });
    }

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
