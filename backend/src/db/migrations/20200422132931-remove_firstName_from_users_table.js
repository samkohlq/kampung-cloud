"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "firstName");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "firstName", Sequelize.STRING);
  },
};
