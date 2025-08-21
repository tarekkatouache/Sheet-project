// frontend/src/components/Instrument.jsx

import React from "react";
import "./Instrument.css"; // optional, for styling
import { useState } from "react";
import EditInstrumentModal from "./EditInstrumentModal";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

function handleFicheClick(instrument) {
  // Handle the logic for Fiche click
  console.log("Fiche clicked for instrument:", instrument);
}
function refreshInstruments() {
  // Logic to refresh the instruments list
  // This could involve re-fetching data from an API or updating local state
  console.log("Instruments list refreshed");
}

export default function Instrument({
  instrument,
  systems,
  onDelete,
  handleInstrumentUpdated,
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
          {/* <strong>SystèmeId:</strong> 
          
          
          
          {instrument.system?.name || "Non attribué"} */}

          <strong>
            Système: {system ? system.name : "Non attribué (supprimé)"}
          </strong>
        </div>
        <div className="instrument-buttons">
          <button
            onClick={() => {
              handleFicheClick(instrument);
            }}
          >
            <Link to={`/dashboard/Sheets/${instrument.id}`}>Fiche</Link>
          </button>
          <button onClick={() => setShowEditModal(true)}>
            <img
              src="/icons2/compose.png"
              alt="icon
                  
                  "
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>
          <button onClick={() => onDelete(instrument.id)}>
            <img
              src="/icons2/delete.png"
              alt="icon
                  
                  "
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>
          {showEditModal && (
            <EditInstrumentModal
              instrument={instrument}
              systems={systems}
              onClose={() => setShowEditModal(false)}
              onUpdate={refreshInstruments} // A function you define in parent to re-fetch or update state
            />
          )}
        </div>
      </div>
    </div>
  );
}
