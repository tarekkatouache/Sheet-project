import React, { useState } from "react";
import api from "../services/api";
export default function EditSheetModal({ sheet, onClose, onUpdate }) {
  const [description, setDescription] = useState(sheet.description);
  const [instrumentId, setInstrumentId] = useState(sheet.instrumentId);
  const [systemId, setSystemId] = useState(sheet.systemId);
  const [version, setVersion] = useState(sheet.version);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to update the sheet
      await api.put(`/technical-sheets/${sheet.id}`, {
        instrumentId,
        systemId,
        version,
        description,
      });
      onUpdate(); // Refresh the list after update
      onClose(); // Close the modal
    } catch (err) {
      console.error("Error updating sheet:", err);
    }
  };

  return (
    <div className="edit-sheet-modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit Sheet</h2>
        <label>
          Title:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
