import React from "react";
import { useParams } from "react-router-dom";
import Instrument from "./Instrument";
export default function InstrumentsPerSubSystem() {
  const { subSystemName } = useParams();
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "-12px" }}>
        les instruments de {subSystemName}
      </h1>
      <div className="instruments-grid">
        {filteredInstruments.map((instrument) => (
          <Instrument
            key={instrument.id}
            instrument={instrument}
            systems={systems}
            onDelete={handleDeleteInstrument}
            handleInstrumentUpdated={handleUpdateInstrument}
          />
        ))}
      </div>
    </div>
  );
}
