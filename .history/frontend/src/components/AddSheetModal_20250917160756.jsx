import React, { useState, useEffect } from "react";
import { uploadTechnicalSheet } from "../services/technicalSheet";
import { useParams } from "react-router-dom";
import api from "../services/api"; // ✅ axios instance
import { getInstrumentById } from "../services/instruments"; // ✅ import the service

export default function AddSheetModal({
  onClose,
  onAdd,
  hasSheets,
  oldReference,
  setOldReference,
}) {
  const { id } = useParams(); // instrumentId from URL
  const [file, setFile] = useState(null);
  const [systemId, setSystemId] = useState(null); // ✅ store systemId
  const token = localStorage.getItem("token");
  const [instrument, setInstrument] = useState(null);
  const [fileError, setFileError] = useState("");
  const [reference, setReference] = useState("");
  const [key_words, setKey_words] = useState([]); // new state for keywords
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
    setOldReference(reference);
    console.log("oldReference in AddSheetModal before reset:", oldReference);
    console.log("reference in AddSheetModal before reset:", reference);

    try {
      if (!file) {
        alert("Please select a file first ❗");
        return;
      }
      if (!reference) {
        alert("Please enter a reference ❗");
        return;
      }
      if (!id) {
        alert("Instrument ID is missing ❗");
        return;
      }
      if (!key_words) {
        alert("Please enter keywords ❗");
        return;
      }

      const uploadedSheet = await uploadTechnicalSheet(
        file,
        reference,
        id,
        key_words
      );
      console.log("Uploaded keywords from AddSheetModal:", key_words);
      if (onAdd) onAdd(uploadedSheet.sheet); // pass only the new sheet
      onClose();
      console.log("Uploaded sheet from AddSheetModal:", uploadedSheet);
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
          {
            <input
              type="text"
              value={hasSheets ? oldReference : reference}
              onChange={(e) => {
                hasSheets
                  ? setReference(oldReference)
                  : setReference(e.target.value);
              }}
              placeholder="Reference"
            />
          }
          <input
            type="text"
            value={key_words}
            // fill keywords state table from input
            onChange={(e) =>
              setKey_words(e.target.value.split(",").map((kw) => kw.trim()))
            }
            placeholder="Ajouter des mots-clés (séparés par des virgules)"
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
