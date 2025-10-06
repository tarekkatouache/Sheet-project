// export default function SubSystemComponent() {
//   return <div>SubSystemComponent</div>;
// }

import React from "react";
import "./SubSystemComponent.css";

function SubSystemComponent({
  subSystem,
  onViewInstruments,
  onEdit,
  onDelete,
}) {
  return (
    <div className="subsystem-container">
      <div className="subsystem-header">
        <span className="subsystem-id">ID: {subSystem.id}</span>
        <span className="subsystem-name">Name: {subSystem.name}</span>
      </div>
      <div className="subsystem-details">
        <p>Additional details about the subsystem can go here.</p>
      </div>
      <div className="subsystem-actions">
        <button onClick={() => onViewInstruments(subSystem.id)}>
          View Instruments
        </button>
        <button onClick={() => onEdit(subSystem)}>Edit</button>
        <button onClick={() => onDelete(subSystem.id)}>Delete</button>
      </div>
    </div>
  );
}

export default SubSystemComponent;
