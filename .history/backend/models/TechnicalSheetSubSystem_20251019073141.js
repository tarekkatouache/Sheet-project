const { DataTypes } = require("sequelize"); // import DataTypes from sequelize
const sequelize = require("../db"); // import the sequelize connection
const User = require("./User"); // import User model
const System = require("./System"); // import System model

const TechnicalSheetSubSystem = sequelize.define(
  // define the TechnicalSheetSubSystem model
  "sub_system_technical_sheets",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    SystemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: System,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    subSystemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubSystem,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    systemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: System,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    updatedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "SET NULL",
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
    services: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    tableName: "TechnicalSheetSubSystem",
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["systemId", "name"], // enforce unique instrument names per system
      },
    ],
  }
);

// Associations
Instrument.belongsTo(System, { foreignKey: "systemId" });
System.hasMany(Instrument, { foreignKey: "systemId" });

//  associations

module.exports = TechnicalSheetSubSystem;
