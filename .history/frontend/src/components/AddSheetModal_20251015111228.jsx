import React, { useState, useEffect } from "react";
import { uploadTechnicalSheet } from "../services/technicalSheet";
import { useParams } from "react-router-dom";
import api from "../services/api"; // ✅ axios instance
import { getInstrumentById } from "../services/instruments"; // ✅ import the service
import "./AddSheetModal.css"; // optional, for styling
export default function AddSheetModal({
  onClose,
  onAdd,
  hasSheets,
  oldReference,
  setOldReference,
}) {
  const { id } = useParams(); // instrumentId from URL
  const { subSystemid } = useParams(); // subSystemId from URL
  const [file, setFile] = useState(null);
  const [systemId, setSystemId] = useState(null); // ✅ store systemId
  const token = localStorage.getItem("token");
  const [instrument, setInstrument] = useState(null);
  const [fileError, setFileError] = useState("");
  const [newReference, setNewReference] = useState("");
  // const [subSystemid, setSubSystemid] = useState(null); // ✅ store subSystemid
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
        "l'extension de ce fichier n'est pas supportée (seuls .docx, .xlsx sont autorisés)"
      );
      e.target.value = "";
      return;
    }

    setFileError("");
    setFile(f);
  };
  // get subSystemId from param url

  console.log("subSystemId from URL:", subSystemid);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reference = hasSheets ? oldReference : newReference;
    console.log("Submitting final reference:", reference);
    console.log("Submitting new reference:", newReference);
    console.log("Submitting old reference:", oldReference);

    console.log("File to upload:", file);
    if (!file) {
      alert("Please select a file first ❗");
      return;
    }
    console.log("Reference:", reference);
    if (!reference) {
      alert("Please enter a reference ❗");
      return;
    }
    console.log("Instrument ID:", id);
    if (!id) {
      alert("Instrument ID is missing ❗");
      return;
    }

    console.log("keywords:", key_words);
    if (!key_words) {
      alert("Please enter keywords ❗");
      return;
    }
    console.log("subSystemid:", subSystemid);
    if (!subSystemid) {
      alert("subSystemid is missing ❗");
      return;
    }

    try {
      const uploadedSheet = await uploadTechnicalSheet(
        file,
        reference, // 🔑 always send valid reference
        id,
        subSystemid,
        key_words
      );

      if (onAdd) onAdd(uploadedSheet.sheet);
      onClose();
    } catch (err) {
      console.error("Error uploading:", err.response?.data || err.message);
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
            value={hasSheets ? oldReference : newReference}
            // only allow changing reference if hasSheets is false
            style={{ backgroundColor: hasSheets ? "#e0e0e0" : "white" }} // gray out if hasSheets
            onChange={(e) => {
              if (!hasSheets) {
                setNewReference(e.target.value); // only editable when hasSheets is false
              }
            }}
            readOnly={hasSheets} // prevents typing when oldReference is locked
            placeholder="Reference"
          />

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
