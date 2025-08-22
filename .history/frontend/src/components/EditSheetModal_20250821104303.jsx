import React, { useState } from "react";
import api from "../services/api";
import ReactDOM from "react-dom";
import "./EditSheetModal.css";

export default function EditSheetModal({ sheet, onClose, onUpdate }) {
  const [description, setDescription] = useState(sheet.description);
  const [instrumentId, setInstrumentId] = useState(sheet.instrumentId);
  const [systemId, setSystemId] = useState(sheet.systemId);
  const [version, setVersion] = useState(sheet.version);

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
          Description:
          <textarea
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
