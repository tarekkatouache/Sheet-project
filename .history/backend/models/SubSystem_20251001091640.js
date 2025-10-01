const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Subsystem = sequelize.define(
  "Subsystem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
  },
  {
    tableName: "subsystems",
    timestamps: true,
    paranoid: true,
  }
);

// models/System.js

module.exports = System;
