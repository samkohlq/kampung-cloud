"use strict";
module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      details: DataTypes.TEXT,
      deadline: DataTypes.DATE,
      requestorUid: DataTypes.STRING,
      fulfillerUid: DataTypes.STRING,
      status: DataTypes.INTEGER,
      declaration: DataTypes.BOOLEAN,
    },
    {}
  );
  return Request;
};
