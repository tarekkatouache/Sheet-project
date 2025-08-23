import React from "react";
import "./TechnicalSheet.css";
import { deleteTechnicalSheet } from "../services/technicalSheet";
import updateTechnicalSheet from "../services/technicalSheet";
import EditSheetModal from "./EditSheetModal";
import { useState, useEffect } from "react";
// import { get } from "../../../backend/routes/technicalSheets";
import { getUserById } from "../services/user"; // Import the user service to fetch user details
import { getInstrumentById } from "../services/instruments"; // Import the instrument service to fetch instrument details
// import { get } from "../../../backend/routes/technicalSheets";
// use Portal

function handleDisplaySheet(sheet) {
  // Implement the logic to display the technical sheet details depending the pdfFilePath
  if (sheet.pdfFilePath) {
    window.open(`http://localhost:5000/${sheet.pdfFilePath}`, "_blank");
  } else {
    console.log("No PDF available for sheet:", sheet);
  }
}
function handleDownloadSheet(sheet) {
  if (sheet.originalFilePath) {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/${sheet.originalFilePath}`;
    link.download = sheet.originalFilePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.log("No word file  available for sheet:", sheet);
  }
}
function handleEditSheet(sheet) {
  // Implement the logic to open the edit modal with the selected sheet's data
  // This could be a modal that allows the user to edit the sheet's details
}

function TechnicalSheet({ sheet, onDelete }) {
  // console.log("TechnicalSheet user id:", sheet.uploadedByUserId);
  // console.log("####################");
  // console.log("TechnicalSheet instrument id sheet:", sheet.instrumentId);

  //get instrument name and system id using instrumentId
  const [instrument, setInstrument] = useState(null);
  const [instrumentIsSoftDeleted, setInstrumentIsSoftDeleted] = useState(false);

  useEffect(() => {
    console.log("TechnicalSheet useEffect instrumentId:", sheet.instrumentId);
    if (!sheet.instrumentId) return;

    getInstrumentById(sheet.instrumentId)
      .then((fetchedInstrument) => {
        // console.log("Fetched instrument:", fetchedInstrument);
        setInstrument(fetchedInstrument);
        instrument && console.log("Instrument set:", instrument.name);
        if (instrument.deletedAt !== null) {
          setInstrumentIsSoftDeleted(true);
        }
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          console.log("Instrument not found (probably soft deleted)");
          setInstrument(null);
        } else {
          console.error(error);
        }
      });
  }, [sheet?.instrumentId]); // ✅ run only when this id changes
  //get username and lastname using uploadedByUserId////////////////////
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!sheet?.uploadedByUserId) return;

    getUserById(sheet.uploadedByUserId)
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((error) => {
        // console.error("Error fetchi  ng user:", error);
      });
  }, [sheet?.uploadedByUserId]); // ✅ run only when this id changes

  ////////////////////////////////////////////////////////
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="technical-sheet-container">
      <div
        style={{
          backgroundColor: instrumentIsSoftDeleted
            ? "#89040fff"
            : "transparent",
        }}
        className="technical-sheet-card"
      >
        <div className="technical-sheet">
          <div className="inside-technical-sheet">
            <p>
              <strong>instrument</strong>
              <br></br>
              {instrument ? instrument.name : "Chargement..."}
            </p>
            {/* Display instrument name is null why */}
            <p>
              <strong>téléchargé-par</strong>
              <br></br>
              {user ? `${user.name} ${user.lastName}` : "Inconnu"}
            </p>
            <p>
              <strong>location</strong>
              <br></br>
              {instrument ? instrument.location : "Inconnu"}
            </p>

            <p>
              <strong>version</strong> {sheet.version}
            </p>
            {/* fetch username and lastname using uploadedByUserId */}
            <p>
              <strong>created at</strong> {sheet.createdAt}
            </p>
            {/* <strong>description:</strong> {instrument.description} */}
            {/* <strong>
               Système: {system ? system.name : "Non attribué (supprimé)"} 
            </strong> */}
          </div>
          <div className="technical-sheet-buttons">
            <button
              onClick={() => {
                handleDisplaySheet(sheet);
              }}
            >
              <img
                src="/icons2/download.png"
                alt="icon
                  
                  "
                style={{
                  filter: "invert(1) brightness(1.5) contrast(1.2)",
                  width: "20px",
                  padding: "2px",
                }}
              />
            </button>
            <button
              onClick={() => {
                handleDownloadSheet(sheet);
                console.log("Displaying sheet:", sheet.pdfFilePath);
              }}
            >
              <img
                src="/icons2/download1.png"
                alt="icon
                  
                  "
                style={{
                  filter: "invert(1) brightness(1.5) contrast(1.2)",
                  width: "20px",
                  padding: "2px",
                }}
              />
            </button>
            <button onClick={() => onDelete(sheet.id)}>
              <img
                src="/icons2/delete.png"
                alt="icon"
                style={{
                  filter: "invert(1) brightness(1.5) contrast(1.2)",
                  width: "20px",
                  padding: "2px",
                }}
              />
            </button>
            {/* <button onClick={() => setShowEditModal(true)}>
              <img
                src="/sheetIcons/list.png"
                alt="icon"
                style={{
                  filter: "invert(1) brightness(1.5) contrast(1.2)",
                  width: "20px",
                  padding: "2px",
                }}
              />
            </button> */}
            {showEditModal && (
              <EditSheetModal
                sheet={sheet}
                onClose={() => setShowEditModal(false)}
                // onUpdate={refreshInstruments} // A function you define in parent to re-fetch or update state
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicalSheet;
