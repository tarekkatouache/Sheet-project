import React, { useState, useEffect } from "react";
import "./EditSystemModal.css"; //
import api from "../services/api"; // ton instance axios
import ReactDOM from "react-dom";

export default function EditSystemModal({ system, onClose, onSystemUpdated }) {
  const [name, setName] = useState(system.name || "");
  const [description, setDescription] = useState(system.description || "");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/systems/${system.id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // onSystemUpdated(res.data); // Pour recharger la liste après modif
      onClose(); // Ferme la modale
    } catch (error) {
      console.error("Error updating system:", error);
      alert("Erreur lors de la mise à jour");
    }
  };
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Create New System</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>System Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit"></button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
