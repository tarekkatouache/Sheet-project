// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("sub_systems", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       system_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: "systems", key: "id" },
//         onDelete: "CASCADE",
//       },
//       name: {
//         type: Sequelize.STRING(100),
//         allowNull: true,
//       },
//       code: {
//         type: Sequelize.STRING(50),
//         allowNull: true,
//         unique: true,
//       },
//       description: {
//         type: Sequelize.TEXT,
//         allowNull: true,
//       },
//       createdby_user_id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       created_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal("NOW()"),
//       },
//       updated_at: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.literal("NOW()"),
//       },
//       deleted_at: {
//         type: Sequelize.DATE,
//         allowNull: true,
//       },
//     });

//     await queryInterface.addIndex("sub_systems", ["system_id"], {
//       name: "idx_sub_systems_system_id",
//     });
//     await queryInterface.addIndex("sub_systems", ["createdby_user_id"], {
//       name: "idx_sub_systems_createdby",
//     });
//   },

//   down: async (queryInterface) => {
//     await queryInterface.dropTable("sub_systems");
//   },
// };
