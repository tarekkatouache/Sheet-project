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
      unique: false, // each system name should be unique
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: false, // each system code should be unique
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
    tableName: "sub_systems",
    timestamps: true,
    paranoid: true,
  }
);

// models/SubSystem.js
SubSystem.associate = (models) => {
  // A SubSystem belongs to one System
  SubSystem.belongsTo(models.System, {
    foreignKey: "systemId",
    as: "system",
    onDelete: "CASCADE",
  });

  // A SubSystem can have many Instruments
  SubSystem.hasMany(models.Instrument, {
    foreignKey: "subSystemId",
    as: "instruments",
  });

  // A SubSystem can have many SubSystemTechnicalSheets
  SubSystem.hasMany(models.SubSystemTechnicalSheet, {
    foreignKey: "subSystemId",
    as: "technicalSheets",
  });
  return SubSystem;
};

module.exports = SubSystem;
