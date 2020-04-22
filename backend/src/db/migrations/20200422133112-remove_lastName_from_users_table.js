"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "lastName");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "lastName", Sequelize.STRING);
  },
};
