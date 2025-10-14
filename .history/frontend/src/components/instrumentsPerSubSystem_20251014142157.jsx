import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Instrument from "./Instrument";

import { getInstrumentsBySubSystemId } from "../services/instruments";
export default function InstrumentsPerSubSystem() {
  const { subSystemName } = useParams();
  const { SubSystemId } = useParams();
  const [instruments, setInstruments] = React.useState([]);

  React.useEffect(() => {
    // Fetch instruments for the given subSystemId from the backend
    const fetchInstruments = async () => {
      const data = await getInstrumentsBySubSystemId(SubSystemId);
      setInstruments(data);
    };
    fetchInstruments();
  }, [SubSystemId]);
  console.log(
    `instruments for ${subSystemName} and id ${SubSystemId} `,
    instruments
  );

  /////////////////////
  const handleUpdateInstrument = (updatedInstrument) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === updatedInstrument.id ? updatedInstrument : inst
      )
    );
  };

  ///////////////////////
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
