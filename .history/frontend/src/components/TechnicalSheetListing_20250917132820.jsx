import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSheetsByInstrument } from "../services/technicalSheet";
import TechnicalSheet from "./TechnicalSheet";
import "./TechnicalSheetListing.css"; // optional, for styling
import AddSheetModal from "./AddSheetModal";
import api from "../services/api";
import { uploadTechnicalSheet } from "../services/technicalSheet"; // import the upload function
import { deleteTechnicalSheet } from "../services/technicalSheet"; // import the delete function

function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
}
function isSuperuser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "superuser";
}

export default function TechnicalSheetListing({ instrumentName }) {
  const [sheets, setSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddSheetModal, setShowAddSheetModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  // verify if sheets is empty than  set hasSheets to false if not than true
  const [hasSheets, setHasSheets] = useState(false);

  useEffect(() => {
    async function fetchSheets() {
      try {
        const data = await getSheetsByInstrument(id);
        setSheets(data);
      } catch (error) {
        console.error("Error fetching sheets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSheets();
  }, [id]);
  if (sheets.length > 0) {
    console.log("hasSheets is true");
    setHasSheets(true);
  } else {
    console.log("hasSheets is false");
    setHasSheets(false);
  }

  const handleDelete = async (Id) => {
    console.log("Deleting sheet with id from techsheetlisting:", Id);
    //delete sheet only by admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert(
        "Vous n'êtes pas autorisé à supprimer cette feuille, veuillez contacter l'administrateur"
      );
      console.error("Unauthorized delete attempt");
      return;
    }

    await deleteTechnicalSheet(Id);
    setSheets((prev) => prev.filter((sheet) => sheet.id !== Id)); // optimistically update the state  };
  };
  const handleAdd = (uploadedSheet) => {
    setSheets((prev) => [...prev, uploadedSheet]); // no API call here
  };
  return (
    <div>
      {(isAdmin() || isSuperuser()) && (
        <button
          className="add-sheet-button"
          onClick={() => {
            setShowAddSheetModal(true);
          }}
        >
          <img
            src="/sheetIcons/new-document.png"
            alt="icon"
            style={{
              filter: "invert(1) brightness(1.5) contrast(1.2)",
              width: "30px",
              height: "26px",
              padding: "2px 2px 2px 2px",
              margin: "2px 0px 0px 3px",
            }}
          />
        </button>
      )}
      {!loading && !sheets.length && (
        <p>No technical sheets found for this instrument.</p>
      )}
      {!loading && (
        <div>
          {showAddSheetModal && (
            <AddSheetModal
              onClose={() => setShowAddSheetModal(false)}
              onAdd={handleAdd}
            />
          )}
          {/* todo and instrument name */}
          <h2 className="instrument-name-title">
            Fiche technique de l'Instrument {instrumentName}
          </h2>
          {sheets.map((sheet) => (
            <TechnicalSheet
              key={sheet.id}
              sheet={sheet}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
