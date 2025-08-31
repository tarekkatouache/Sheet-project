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
  const [fileError, setFileError] = useState("");
  const [reference, setReference] = useState("");
  //////////////////////////

  const MIME = {
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  // Some browsers don’t set file.type reliably → fall back to extension too
  const isLegacyDoc = (file) =>
    file?.type === MIME.DOC || /\.doc$/i.test(file?.name || "");
  const isLegacyXls = (file) =>
    file?.type === MIME.XLS || /\.xls$/i.test(file?.name || "");

  const isAllowedFile = (file) => {
    if (!file) return false;
    const name = file.name || "";
    const type = file.type || "";

    // block legacy .doc specifically
    if (isLegacyDoc(file)) return false;
    if (isLegacyXls(file)) return false;

    // allow docx/xls/xlsx (by mime or extension)
    const ok =
      type === MIME.DOCX ||
      type === MIME.XLSX ||
      /\.docx$/i.test(name) ||
      /\.xlsx?$/i.test(name); // .xls or .xlsx

    return ok;
  };
  //////////////////////////

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (isLegacyDoc(f)) {
      setFile(null);
      setFileError("“.doc” files aren’t supported. Please convert to “.docx”.");
      e.target.value = ""; // reset input
      alert("“.doc” files aren’t supported. Please convert to “.docx”.");
      return;
    }

    if (isLegacyXls(f)) {
      setFile(null);
      setFileError("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      e.target.value = ""; // reset input
      alert("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      return;
    }

    if (!isAllowedFile(f)) {
      setFile(null);
      setFileError(
        "Unsupported file type. Please upload .docx, .xls or .xlsx."
      );
      e.target.value = "";
      return;
    }

    setFileError("");
    setFile(f);
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

      const uploadedSheet = await uploadTechnicalSheet(file, id, token);

      if (onAdd) onAdd(uploadedSheet.sheet); // pass only the new sheet
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
          <input
            type="file"
            accept=".doc,.docx,.xlsx,.xls"
            onChange={handleFileChange}
          />
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Reference"
          />

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
