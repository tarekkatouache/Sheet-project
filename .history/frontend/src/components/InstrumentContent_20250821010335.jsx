// frontend/src/pages/InstrumentsContent.jsx

import React, { useEffect, useState } from "react";
import Instrument from "./Instrument";
import api from "../services/api";
import AddInstrumentModal from "./AddInstrumentModal";
import axios from "axios";
import { getSystems } from "../services/systems";

export default function InstrumentContent() {
  ////////////////////////fetching systems
  const [systems, setSystems] = useState([]);
  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const data = await getSystems();
        setSystems(data);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };

    fetchSystems();
  }, []);
  /////////////////////////////////

  const [instruments, setInstruments] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await api.get("/instruments");
        setInstruments(response.data);
      } catch (error) {
        console.error("Failed to fetch instruments:", error);
      }
    };
    fetchInstruments();
  }, []);
  /////////////////////
  const handleUpdateInstrument = (updatedInstrument) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === updatedInstrument.id ? updatedInstrument : inst
      )
    );
  };

  //////////////////////

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

  const handleAdd = (newInstrument) => {
    api.post("/instruments", newInstrument).then((res) => {
      setInstruments((prev) => [...prev, res.data]);
    });
  };

  return (
    <div className="instruments-container">
      <h1 style={{ margin: "auto auto", justifySelf: "center" }}>
        Instruments
      </h1>

      <button onClick={() => setShowModal(true)}>Ajouter Instrument</button>

      {showModal && (
        <AddInstrumentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      <div className="instruments-grid">
        {instruments.map((instrument) => (
          <Instrument
            key={instrument.id}
            instrument={instrument}
            systems={systems}
            onDelete={handleDeleteInstrument}
            handleInstrumentUpdated={handleUpdateInstrument} // 👈 add this
          />
        ))}
      </div>
    </div>
  );
}
