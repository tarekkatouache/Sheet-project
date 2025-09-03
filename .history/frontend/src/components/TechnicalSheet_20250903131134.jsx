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

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
}
function isSuperuser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "superuser";
}

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

  /////////////////////////////// get instrument and system detail at the same time
  const [system, setSystem] = useState(null);
  const [systemIsSoftDeleted, setSystemIsSoftDeleted] = useState(false);
  //////////get system detail using systemId//////////////
  useEffect(() => {
    if (!instrument?.systemId) return;

    getSystemById(instrument.systemId)
      .then((fetchedSystem) => {
        setSystem(fetchedSystem);
        setSystemIsSoftDeleted(fetchedSystem.deletedAt !== null);
      })
      .catch((error) => {
        // console.error("Error fetching system:", error);
      });
  }, [instrument?.systemId]); // ✅ run only when this id changes

  //////////////////
  useEffect(() => {
    const fetchInstrumentAndSystem = async () => {
      if (!sheet.instrumentId) return;

      try {
        // 1️⃣ Fetch instrument
        const fetchedInstrument = await getInstrumentById(sheet.instrumentId);
        setInstrument(fetchedInstrument);

        // Handle soft delete for instrument
        setInstrumentIsSoftDeleted(fetchedInstrument.deletedAt !== null);

        // 2️⃣ If instrument has a valid systemId and is not soft deleted, fetch system
        if (
          fetchedInstrument.systemId &&
          fetchedInstrument.deletedAt !== null
        ) {
          try {
            const fetchedSystem = await getSystemById(
              fetchedInstrument.systemId
            );
            setSystem(fetchedSystem);
            setSystemIsSoftDeleted(fetchedSystem.deletedAt !== null);
          } catch (error) {
            if (error.response?.status === 404) {
              console.log("System not found (probably soft deleted)");
              setSystem(null);
              setSystemIsSoftDeleted(true);
            } else {
              console.error("Error fetching system:", error);
            }
          }
        } else {
          setSystem(null); // no system if instrument soft deleted
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("Instrument not found (probably soft deleted)");
          setInstrument(null);
          setInstrumentIsSoftDeleted(true);
        } else {
          console.error("Error fetching instrument:", error);
        }
      }
    };

    fetchInstrumentAndSystem();
  }, [sheet.instrumentId]); // 🔑 runs when instrumentId changes

  ///////////////////////////////  instrument and system detail at the same time

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
            ? "#b0242fff"
            : "transparent",
          opacity: instrumentIsSoftDeleted ? 0.6 : 1,
          border: systemIsSoftDeleted ? "2px solid red" : "none",
        }}
        className="technical-sheet-card"
      >
        {instrumentIsSoftDeleted ? (
          <p className="soft-deleted-warning" style={{}}>
            LEUR INSTRUMENT A ÉTÉ SUPPRIME
          </p>
        ) : null}
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
              <strong>Version</strong> {sheet.version}
            </p>
            {/* fetch username and lastname using uploadedByUserId */}
            <p>
              <strong>Reference</strong> {sheet.reference}
            </p>
            {/* <strong>description:</strong> {instrument.description} */}
            {/* <strong>
               Système: {system ? system.name : "Non attribué (supprimé)"} 
            </strong> */}
          </div>
          {(isAdmin() || isSuperuser()) && (
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
              <button onClick={() => setShowEditModal(true)}>
                <img
                  src="/sheetIcons/list.png"
                  alt="icon"
                  style={{
                    filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "20px",
                    padding: "2px",
                  }}
                />
              </button>
            </div>
          )}
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
  );
}

export default TechnicalSheet;
