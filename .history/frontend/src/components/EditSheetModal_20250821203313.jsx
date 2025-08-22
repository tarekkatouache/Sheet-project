import React, { useEffect, useState } from "react";
import { getSheetWithInstrumentAndSystem } from "../services/sheetService";
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
      const updatedSheet = {
        description,
        instrumentId,
        systemId,
        version,
        userId,
      };
      const response = await api.put(
        `/technical-sheets/${sheet.id}`,
        updatedSheet
      );
      onUpdate(response.data); // Call the parent function to update the sheet list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating sheet:", error);
      alert("Failed to update sheet");
    }
  };
  // get all systems to put it the select systems
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    fetchSystems();
  }, []);
  const fetchSystems = async () => {
    try {
      const response = await api.get("/systems");
      setSystems(response.data);
    } catch (err) {
      console.error("Error fetching systems:", err);
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
          <select name="system" onChange={(e) => setSystemId(e.target.value)}>
            <option value={systemName}>{systemName || "Select System"}</option>
            {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>
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
