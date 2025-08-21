import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import api from "../services/api"; // axios instance

const token = localStorage.getItem("token");

export default function EditInstrumentModal({
  instrument,
  systems,
  onClose,
  onUpdate, // parent should handle updating its state
}) {
  const [formData, setFormData] = useState({
    name: instrument.name || "",
    description: instrument.description || "",
    systemId: instrument.systemId || "",
    location: instrument.location || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/instruments/${instrument.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Tell parent the updated instrument
      if (onUpdate) {
        onUpdate(response.data); // send updated instrument back
      }

      onClose();
    } catch (err) {
      console.error("Failed to update instrument", err);
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifier l'instrument</h2>
        <form onSubmit={handleSubmit}>
          <label>Nom:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Location:</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <label>Système:</label>
          <select
            name="systemId"
            value={formData.systemId}
            onChange={handleChange}
            required
          >
            {systems.map((sys) => (
              <option key={sys.id} value={sys.id}>
                {sys.name}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
