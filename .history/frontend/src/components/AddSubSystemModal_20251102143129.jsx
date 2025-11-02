import React, { useState, useEffect } from "react";
import "./AddInstrumentModal.css";
import ReactDOM from "react-dom";
import { addSubSystem } from "../services/subSystems";
import { createSubSystem } from "../services/subSystems";
import { data } from "react-router-dom";
import { useParams } from "react-router-dom";

// //get user id from local storage
// const user = JSON.parse(localStorage.getItem("user"));
// const userId = user.id || null;

const storedUser = localStorage.getItem("user");
let userId = null;

if (storedUser) {
  try {
    const user = JSON.parse(storedUser);
    userId = user?.id || null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
  }
}
///////////////////////////
export default function AddSubSystemModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    room: "",
    building: "",
    code: "",
    createdbyUserId: null,
    systemId: "",
  });
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  ////////
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
      setFile(null);
      setFileError("“.doc” files aren’t supported. Please convert to “.docx”.");
      e.target.value = ""; // reset input
      alert("“.doc” files aren’t supported. Please convert to “.docx”.");
      return;
    }

    if (isLegacyXls(technicalSheet)) {
      setFile(null);
      setFileError("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      e.target.value = ""; // reset input
      alert("“.xls” files aren’t supported. Please convert to “.xlsx”.");
      return;
    }

    if (!isAllowedFile(technicalSheet)) {
      setFile(null);
      setFileError(
        "l'extension de ce fichier n'est pas supportée (seuls .docx, .xlsx sont autorisés)"
      );
      e.target.value = "";
      return;
    }

    setFileError("");
    setFile(technicalSheet);
    console.log("file", technicalSheet);
    console.log("formdata", formData);
  }; //////////
  /////// fetching systems

  ///////////////
  // get systemId from params url

  const [systems, setSystems] = useState([]);
  const [subSystems, setSubSystems] = useState("");
  // add systemId to formData when user select a system from dropdown
  // const handleSystemChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     systemId: e.target.value,
  //   }));
  //   console.log("Selected systemId:", e.target.value);
  // };
  //////////////
  const { systemId } = useParams();
  console.log("system id  :", systemId);
  // turn systemId to integer
  const systemIdInt = parseInt(systemId);
  //   add systemId to formdata

  ////////////////////////////
  const handleChange = (e) => {
    formData.createdbyUserId = userId;
    formData.systemId = systemIdInt;
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedSubSystem = await createSubSystem(formData);

      if (onAdd) onAdd(uploadedSubSystem);
      onClose();
    } catch (err) {
      console.error("Error uploading:", err.response?.data || err.message);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter un Sous Système</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom de le sous système"
            required
          />

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Type de sous système (armoire, pompe a eau ... etc )"
            required
          />
          <input
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="Salle"
            required
          />

          <input
            name="building"
            value={formData.building}
            onChange={handleChange}
            placeholder="Bâtiment"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          {/* add file docx */}
          <input
            type="file"
            accept=".doc,.docx,.xlsx,.xls"
            onChange={handleFileChange}
          />

          <div className="modal-actions">
            <button className="Button" type="submit">
              Ajouter
            </button>
            <button className="Button" type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
        {/* add services conserns */}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
