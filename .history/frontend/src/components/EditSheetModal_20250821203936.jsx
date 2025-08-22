import React, { useEffect, useState } from "react";
import { getsheetWithInstrumentAndSystem } from "../services/technicalSheet";
import api from "../services/api";
import ReactDOM from "react-dom";
import "./EditSheetModal.css";

export default function EditSheetModal({ sheet, onClose, onUpdate }) {
  const [description, setDescription] = useState(sheet.description);
  const [instrumentId, setInstrumentId] = useState(sheet.instrumentId);
  const [systemId, setSystemId] = useState(sheet.systemId);
  const [version, setVersion] = useState(sheet.version);
  const [userId, setUserId] = useState(sheet.userId);

  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch latest sheet details (with instrument + system)
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const data = await getsheetWithInstrumentAndSystem(sheet.id);
        setDescription(data.description);
        setInstrumentId(data.instrumentId);
        setSystemId(data.Instrument?.systemId || "");
        setVersion(data.version);
        setUserId(data.userId);
      } catch (err) {
        console.error("Error fetching sheet:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSheetData();
  }, [sheet.id]);

  // fetch systems list for dropdown
  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await api.get("/systems");
        setSystems(response.data);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };
    fetchSystems();
  }, []);

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

      onUpdate(response.data); // update parent
      onClose(); // close modal
    } catch (error) {
      console.error("Error updating sheet:", error);
      alert("Failed to update sheet");
    }
  };

  if (loading) return <p>Loading...</p>;

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
          {/* 👆 later we can replace with dropdown if you want */}
        </label>

        <label>
          System:
          <select
            value={systemId}
            onChange={(e) => setSystemId(e.target.value)}
          >
            <option value="">Select System</option>
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
