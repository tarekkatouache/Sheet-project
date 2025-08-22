import React from "react";
import "./TechnicalSheet.css";
import { deleteTechnicalSheet } from "../services/technicalSheet";
import { useState } from "react";
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

function TechnicalSheet({ sheet, onDelete }) {
  // add edit sheet
  const [isEditing, setIsEditing] = useState(false);
  const [editedSheet, setEditedSheet] = useState(sheet);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedSheet({ ...editedSheet, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Call API to update the sheet
    updateTechnicalSheet(editedSheet)
      .then(() => {
        setIsEditing(false);
        onUpdate(editedSheet);
      })
      .catch((error) => {
        console.error("Error updating sheet:", error);
      });
  };

  return (
    <div className="technical-sheet-container">
      <div className="technical-sheet-card">
        <div className="technical-sheet">
          <div className="inside-technical-sheet">
            {/* <h3>{instrument.name}</h3> */}
            <h3>{sheet.id}</h3>

            <p>{/* <strong>location :</strong> {instrument.location} */}</p>
            <p>{sheet.version}</p>
            {/* fetch username and lastname using uploadedByUserId */}
            <p>{sheet.uploadedByUserId}</p>
            <p>{sheet.createdAt}</p>
            <p>{sheet.uploadedByUserId}</p>
            <p>{sheet.uploadedByUserId}</p>
            {/* <strong>description:</strong> {instrument.description} */}

            <strong>
              {/* Système: {system ? system.name : "Non attribué (supprimé)"} */}
            </strong>
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
            {/* {showEditModal && (
              <EditInstrumentModal
                instrument={instrument}
                systems={systems}
                onClose={() => setShowEditModal(false)}
                // onUpdate={refreshInstruments} // A function you define in parent to re-fetch or update state
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicalSheet;
