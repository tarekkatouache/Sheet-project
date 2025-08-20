// // controllers/technicalSheetDataController.js
// const TechnicalSheetData = require("../models/TechnicalSheetData"); // Sequelize model

// async function processTechnicalSheetData(_filePath, metadata) {
//   try {
//     // ✅ Just create a record with empty fields (or defaults)
//     const data = {
//       technicalSheetId: metadata.technicalSheetId,
//       userId: metadata.userId,
//       instrumentId: metadata.instrumentId,
//       // systemId: metadata.systemId, // keep if needed
//       field1: null,
//       field2: null,
//       field3: null,
//       field4: null,
//       field5: null,
//       field6: null,
//       field7: null,
//       field8: null,
//       field9: null,
//       field10: null,
//     };

//     await TechnicalSheetData.create(data);

//     console.log("✅ Saved empty TechnicalSheetData:", data);
//   } catch (err) {
//     console.error("❌ Failed to save TechnicalSheetData:", err);
//     throw err;
//   }
// }

// module.exports = { processTechnicalSheetData };
