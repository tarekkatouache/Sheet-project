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
  ///////////////////////

  const handleDeleteInstrument = async (id) => {
    // add condition for admin only
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert(
        "Vous n'êtes pas autorisé à supprimer cet instrument, veuillez contacter l'administrateur"
      );
      console.error("Unauthorized delete attempt");
      return;
    }

    try {
      await api.delete(`/instruments/${id}`);
      setInstruments((prev) => prev.filter((inst) => inst.id !== id));
    } catch (error) {
      console.error("Failed to delete instrument:", error);
    }
  };
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
