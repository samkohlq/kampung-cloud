"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "verificationStatus");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Posts",
      "verificationStatus",
      Sequelize.INTEGER
    );
  },
};
