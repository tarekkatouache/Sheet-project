import React, { useState } from "react";
import "./AddSystemModal.css"; // Import CSS file
import api from "../services/api"; // your axios instance
//using portals
import ReactDOM from "react-dom";

export default function AddSystemModal({ isOpen, onClose, onSystemCreated }) {
  const [name, setSystemName] = useState("");
  const [description, setDescription] = useState("");
  const [technicalSheet, setTechnicalSheet] = useState(null);
  const [fileError, setFileError] = useState("");
  /////////////////////file upload handling///////////////////
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    technicalSheet: null,
  });

  const MIME = {
    DOC: "application/msword",
    DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  /////////////////////
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
  ///////////////////////////////////////
  const handleFileChange = (e) => {
    const technicalSheet = e.target.files?.[0];
    if (!technicalSheet) return;

    if (isLegacyDoc(technicalSheet)) {
      setTechnicalSheet(null);
      setFileError("“.doc” files aren’t supported. Please convert to “.docx”.");
      e.target.value = ""; // reset input
      alert("“.doc” files aren’t supported. Please convert to “.docx”.");
      return;
    }

    if (isLegacyXls(technicalSheet)) {
      setTechnicalSheet(null);
      setFileError("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      e.target.value = ""; // reset input
      alert("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      return;
    }

    if (!isAllowedFile(technicalSheet)) {
      setTechnicalSheet(null);
      setFileError(
        "l'extension de ce fichier n'est pas supportée (seuls .docx, .xlsx sont autorisés)"
      );
      e.target.value = "";
      return;
    }

    setFileError("");
    setTechnicalSheet(technicalSheet);
    console.log("file", technicalSheet);
    console.log("formdata", formData);
  }; //////////

  ///////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!technicalSheet) {
        setFileError("Please select a file");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("technicalSheet", technicalSheet);
      const response = await api.post("/systems", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("System created:", response.data);
    } catch (error) {
      console.error(
        "Error creating system:",
        error.response?.data || error.message
      );
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Créer un nouveau système</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Nom du système:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setSystemName(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            value={technicalSheet}
            onChange={(e) => setSystemName(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button className="addSysButton" type="submit">
              <p>Créer</p>
            </button>
            <button className="cancelButton" type="button" onClick={onClose}>
              <p>Annuler</p>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
