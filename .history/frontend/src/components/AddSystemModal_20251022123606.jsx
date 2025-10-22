import React, { useState } from "react";
import "./AddSystemModal.css"; // Import CSS file
import api from "../services/api"; // your axios instance
//using portals
import ReactDOM from "react-dom";

export default function AddSystemModal({ isOpen, onClose, onSystemCreated }) {
  const [name, setSystemName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/systems",
        { name, description }, // request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onSystemCreated(res.data); // callback to update the list
      setSystemName("");
      setDescription("");
      onClose(); // close modal
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
          <div className="modal-buttons">
            <button className="addSysButton" type="submit">
              Créer
            </button>
            <button
              className="cancelButton"
              type="button"
              onClick={onClose}
              className="cancel"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
