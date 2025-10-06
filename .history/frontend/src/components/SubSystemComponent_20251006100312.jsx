// export default function SubSystemComponent() {
//   return <div>SubSystemComponent</div>;
// }

import React from "react";

const SubSystemComponent = ({
  subSystem,
  onEdit,
  onDelete,
  onViewInstruments,
}) => {
  return (
    <div className="sub-system-card">
      <h3>{subSystem.name}</h3>
      <p>{subSystem.description}</p>
      <div className="sub-system-actions">
        <button onClick={() => onViewInstruments(subSystem.id)}>
          View Instruments
        </button>
        <button onClick={() => onEdit(subSystem)}>Edit</button>
        <button onClick={() => onDelete(subSystem.id)}>Delete</button>
      </div>
    </div>
  );
};

export default SubSystemComponent;
