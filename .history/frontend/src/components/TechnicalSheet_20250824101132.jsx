import React from "react";
import "./TechnicalSheet.css";
import { deleteTechnicalSheet } from "../services/technicalSheet";
import updateTechnicalSheet from "../services/technicalSheet";
import EditSheetModal from "./EditSheetModal";
import { useState, useEffect } from "react";
import { getSystemById } from "../services/systems"; // Import the system service to fetch system details
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
  //get instrument name and system id using instrumentId
  const [instrument, setInstrument] = useState(null);
  const [instrumentIsSoftDeleted, setInstrumentIsSoftDeleted] = useState(false);

  useEffect(() => {
    if (!sheet.instrumentId) return;

    getInstrumentById(sheet.instrumentId)
      .then((fetchedInstrument) => {
        // console.log("Fetched instrument:", fetchedInstrument);
        setInstrument(fetchedInstrument);

        if (fetchedInstrument.deletedAt !== null) {
          setInstrumentIsSoftDeleted(true);
        } else {
          setInstrumentIsSoftDeleted(false);
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
  }, []); // ✅ run only when this id changes
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

  // get system name using systemId from instrument
  const [system, setSystem] = useState(null);
  useEffect(() => {
    if (instrument && instrument.systemId) {
      console.log("Instrument's systemId:", 46);
      // Fetch system details using systemId
      // Assuming you have a service function getSystemById
      getSystemById(instrument.systemId)
        .then((res) => {
          setSystem(res.data);
          console.log("Fetched system:", res.data);
        })
        .catch((error) => {
          console.error("Error fetching system:", error);
        });
    }
  }, [instrument]);
  return (
    <div className="technical-sheet-container">
      <div
        style={{
          backgroundColor: instrumentIsSoftDeleted
            ? "#b0242fff"
            : "transparent",
          opacity: instrumentIsSoftDeleted ? 0.6 : 1,
        }}
        className="technical-sheet-card"
      >
        <div className="technical-sheet">
          <div className="inside-technical-sheet">
            <p>
              <strong>System</strong>
              <br></br>
              {system ? system.name : "Chargement..."}
            </p>
            <p>
              <strong>Instrument</strong>
              <br></br>
              {instrument ? instrument.name : "Chargement..."}
            </p>
            <p>
              <strong>Téléchargé par</strong>
              <br></br>
              {user ? `${user.name} ${user.lastName}` : "Inconnu"}
            </p>
            <p>
              <strong>Location</strong>
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
