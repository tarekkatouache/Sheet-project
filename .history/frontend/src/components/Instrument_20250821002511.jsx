import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditInstrumentModal from "./EditInstrumentModal";

export default function Instrument({
  instrument,
  systems,
  onDelete,
  handleInstrumentUpdated, // parent handler
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const system = systems.find((sys) => sys.id === instrument.systemId);

  return (
    <div className="instrument-card">
      <div className="instrument">
        <div className="inside-instrument">
          <h3>{instrument.name}</h3>
          <p>
            <strong>location :</strong> {instrument.location}
          </p>
          <p>
            <strong>description:</strong> {instrument.description}
          </p>
          <strong>
            Système: {system ? system.name : "Non attribué (supprimé)"}
          </strong>
        </div>

        <div className="instrument-buttons">
          <button>
            <Link to={`/dashboard/Sheets/${instrument.id}`}>Fiche</Link>
          </button>

          <button onClick={() => setShowEditModal(true)}>
            <img
              src="/icons2/compose.png"
              alt="edit"
              style={{ width: "20px" }}
            />
          </button>

          <button onClick={() => onDelete(instrument.id)}>
            <img
              src="/icons2/delete.png"
              alt="delete"
              style={{ width: "20px" }}
            />
          </button>

          {showEditModal && (
            <EditInstrumentModal
              instrument={instrument}
              systems={systems}
              onClose={() => setShowEditModal(false)}
              onUpdate={(updatedInstrument) => {
                handleInstrumentUpdated(updatedInstrument); // ✅ update parent state
                setShowEditModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
