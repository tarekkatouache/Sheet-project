const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SubSystem = sequelize.define(
  "SubSystem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    systemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // each system name should be unique
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true, // each system code should be unique
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdbyUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "subsystems",
    timestamps: true,
    paranoid: true,
  }
);

// models/SubSystem.js

module.exports = System;
