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
      <h3>{subSystem.name}</h3>
      <p>{subSystem.description}</p>
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
