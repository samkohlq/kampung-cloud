"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Comments", "postId");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Comments", "postId", Sequelize.STRING);
  },
};
