"use strict";
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "Feedback",
    {
      type: DataTypes.STRING,
      details: DataTypes.TEXT,
      contactInfo: DataTypes.STRING,
    },
    {}
  );
  return Feedback;
};
