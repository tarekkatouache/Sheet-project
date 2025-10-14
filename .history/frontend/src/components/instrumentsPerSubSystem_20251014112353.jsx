import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Instrument from "./Instrument";

import { getInstrumentsBySubSystemId } from "../services/instruments";
export default function InstrumentsPerSubSystem() {
  const { subSystemName } = useParams();
  const [instruments, setInstruments] = React.useState([]);

  React.useEffect(() => {
    // Fetch instruments for the given subSystemId from the backend
    const fetchInstruments = async () => {
      const data = await getInstrumentsBySubSystemId(subSystemId);
      setInstruments(data);
    };
    fetchInstruments();
  }, [subSystemId]);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "-12px" }}>
        les instruments de {subSystemName}
      </h1>
      <div className="instruments-grid">
        {instruments.map((instrument) => (
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
