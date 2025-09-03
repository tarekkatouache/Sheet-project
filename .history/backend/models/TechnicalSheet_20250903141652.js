const { DataTypes } = require("sequelize");
const sequelize = require("../db.js"); // this  point tp db.js file
const TechnicalSheetData = require("./TechnicalSheetData");

const TechnicalSheet = sequelize.define(
  "TechnicalSheet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    instrumentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "instruments",
        key: "id",
      },
    },
    uploadedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    originalFilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdfFilePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false, // NO NULL
      unique: true, // UNIQUE
    },
    //
    technicalDomain: {
      type: DataTypes.STRING,
      values: ["Électric ", "Mechanical", "Civil", "IT", "Telecom", "HVAC"],
    },

    version: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Technical_Sheets",
    timestamps: true, //
    paranoid: true,
  }
);

// Associations

module.exports = TechnicalSheet;
