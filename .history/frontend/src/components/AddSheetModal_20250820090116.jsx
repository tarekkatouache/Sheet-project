import React, { useState, useEffect } from "react";
import { uploadTechnicalSheet } from "../services/technicalSheet";
import { useParams } from "react-router-dom";
import api from "../services/api"; // ✅ axios instance
import { getInstrumentById } from "../services/instruments"; // ✅ import the service

export default function AddSheetModal({ onClose, onAdd }) {
  const { id } = useParams(); // instrumentId from URL
  const [file, setFile] = useState(null);
  const [systemId, setSystemId] = useState(null); // ✅ store systemId
  const token = localStorage.getItem("token");
  const [instrument, setInstrument] = useState(null);

  // // fetch systemId from backend
  // useEffect(() => {
  //   const fetchInstrument = async () => {
  //     try {
  //       const data = await getInstrumentById(id);
  //       setInstrument(data);
  //     } catch (error) {
  //       console.error("Error fetching instrument:", error);
  //     }
  //   };

  //   fetchInstrument();
  // }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Please select a file first ❗");
        return;
      }
      if (!id) {
        alert("Instrument ID is missing ❗");
        return;
      }

      // send instrumentId + file
      const uploadedSheet = await uploadTechnicalSheet(file, id, token);

      console.log("Uploaded successfully ✅");
      if (onAdd) onAdd(uploadedSheet); // pass new sheet back
      onClose();
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter une Fiche</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />

          <div className="modal-actions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
