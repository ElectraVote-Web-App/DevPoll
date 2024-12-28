'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TRIGGER before_vote_insert 
      BEFORE INSERT ON votes
      FOR EACH ROW
      BEGIN
        DECLARE option_exists INT;
        
        SELECT COUNT(*) INTO option_exists
        FROM options 
        WHERE id = NEW.option_id 
        AND poll_id = NEW.poll_id;
        
        IF option_exists = 0 THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Invalid option: This option does not belong to the specified poll';
        END IF;
      END;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS before_vote_insert;
    `);
  }
};
