import React, { useState } from "react";
import api from "../services/api";
import ReactDOM from "react-dom";
import "./EditSheetModal.css";

export default function EditSheetModal({ sheet, onClose, onUpdate }) {
  const [description, setDescription] = useState(sheet.description);
  const [instrumentId, setInstrumentId] = useState(sheet.instrumentId);
  const [systemId, setSystemId] = useState(sheet.systemId);
  const [version, setVersion] = useState(sheet.version);
  const [userId, setUserId] = useState(sheet.userId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/technical-sheets/${sheet.id}`, {
        instrumentId,
        systemId,
        version,
        description,
      });
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating sheet:", err);
    }
  };

  return ReactDOM.createPortal(
    <div className="edit-sheet-modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Sheet</h2>

        <label>
          Instrument:
          <input
            type="text"
            value={instrumentId}
            onChange={(e) => setInstrumentId(e.target.value)}
          />
        </label>
        <label>
          System:
          <input
            type="text"
            value={systemId}
            onChange={(e) => setSystemId(e.target.value)}
          />
        </label>
        <label>
          Version:
          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />
        </label>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>,
    document.body
  );
}
