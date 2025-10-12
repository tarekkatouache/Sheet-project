import React, { useState, useEffect } from "react";
import "./AddInstrumentModal.css";
import ReactDOM from "react-dom";
import { addSubSystem } from "../services/subSystems";
import { data } from "react-router-dom";

//get user id from local storage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;

export default function AddSubSystemModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    room: "",
    building: "",
    code: "",
    createdby_user_id: null,
    systemId: "",
  });
  /////// fetching systems

  ///////////////

  const [systems, setSystems] = useState([]);
  const [subSystems, setSubSystems] = useState("");
  // add systemId to formData when user select a system from dropdown
  const handleSystemChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      systemId: e.target.value,
    }));
    console.log("Selected systemId:", e.target.value);
  };
  //////////////

  ////////////////////////////
  const handleChange = (e) => {
    console.log(
      "Changing formData:",
      e.target.name,
      e.target.value,
      "formData",
      formData
    );
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.createdby_user_id = userId;
    try {
      const uploadedSubSystem = await addSubSystem(data);

      if (onAdd) onAdd(uploadedSubSystem);
      onClose();
    } catch (err) {
      console.error("Error uploading:", err.response?.data || err.message);
    }

    // add subsystem
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

          <div className="modal-actions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>
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
