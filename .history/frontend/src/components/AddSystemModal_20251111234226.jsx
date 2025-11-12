import React, { useState } from "react";
import "./AddSystemModal.css"; // Import CSS file
import api from "../services/api"; // your axios instance
//using portals
import ReactDOM from "react-dom";
import { addSystem } from "../services/systems";

export default function AddSystemModal({ isOpen, onClose, onSystemCreated }) {
  const [name, setSystemName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  /////////////////////file upload handling///////////////////
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
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
    const file = e.target.files?.[0];
    if (!file) return;

    if (isLegacyDoc(file)) {
      setFile(null);
      setFileError("“.doc” files aren’t supported. Please convert to “.docx”.");
      e.target.value = ""; // reset input
      alert("“.doc” files aren’t supported. Please convert to “.docx”.");
      return;
    }

    if (isLegacyXls(file)) {
      setFile(null);
      setFileError("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      e.target.value = ""; // reset input
      alert("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      return;
    }

    if (!isAllowedFile(file)) {
      setFile(null);
      setFileError(
        "l'extension de ce fichier n'est pas supportée (seuls .docx, .xlsx sont autorisés)"
      );
      e.target.value = "";
      return;
    }

    setFileError("");
    setFile(file);
    console.log("file", file);
    console.log("formdata", formData);
  }; //////////

  ///////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setFileError("Please select a file");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("description", description);
      formDataToSend.append("technicalSheet", file);

      // Call the API

      const newSystem = await addSystem(formDataToSend);
      if (onSystemCreated) onSystemCreated(newSystem);

      // Close the modal on success
      onClose();
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
          {/* <input
            type="file"
            value={file ? undefined : ""}
            accept=".doc,.docx,.xlsx,.xls"
            onChange={handleFileChange}
          />
           */}
          <input
            type="file"
            accept=".doc,.docx,.xlsx,.xls"
            onChange={handleFileChange}
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
