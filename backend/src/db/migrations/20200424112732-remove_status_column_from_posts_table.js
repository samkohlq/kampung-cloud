"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "status");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Posts", "status", Sequelize.STRING);
  },
};
