import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api"; // ton instance axios
const token = localStorage.getItem("token");

export default function EditInstrumentModal({
  instrument,
  systems,
  onClose,
  onUpdate,
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
      const res = await axios.put(
        `http://localhost:5000/api/instruments/${instrument.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdate(res.data); // 👈 send updated instrument back to parent
      onClose();
    } catch (err) {
      console.error("Failed to update instrument", err);
      onClose();
    }
  };

  return (
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
            {/* <option value={formData.systemId}>{formData.systemId}</option> */}
            {systems.map((sys) => (
              <option key={sys.id} value={sys.id}>
                {sys.name}
              </option>
            ))}
          </select>

          <button type="submit">Enregistrer</button>
          <button type="button" onClick={onClose}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}
