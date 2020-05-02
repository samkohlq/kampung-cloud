"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "requestDetails");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Posts",
      "requestDetails",
      Sequelize.STRING
    );
  },
};
