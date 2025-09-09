// frontend/src/pages/InstrumentsContent.jsx

import React, { useEffect, useState } from "react";
import Instrument from "./Instrument";
import api from "../services/api";
import AddInstrumentModal from "./AddInstrumentModal";
import axios from "axios";
import { getSystems } from "../services/systems";
import { getInstruments } from "../services/instruments";
import { getInstrumentsByUserService } from "../services/instruments";
function isSuperuser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "superuser";
}
function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
}

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
  const [searchQuery, setSearchQuery] = useState(""); // just for the input value
  const [filteredInstruments, setFilteredInstruments] = useState(instruments); // store filtered data
  useEffect(() => {
    if (isAdmin() || isSuperuser()) {
      console.log("User is admin or superuser");
      const fetchInstruments = async () => {
        try {
          const response = await api.get("/instruments");
          setInstruments(response.data);
        } catch (error) {
          console.error("Failed to fetch instruments:", error);
        }
      };
      fetchInstruments();
    } else {
      const fetchData = async () => {
        try {
          const data = await getInstrumentsByUserService();
          setInstruments(data);
        } catch (error) {
          console.error(
            "❌ Error fetching instruments by user service:",
            error
          );
        } finally {
          console.log("done");
        }
      };

      fetchData();
      console.log("User is not admin or superuser");
    }
  }, []);
  /////////////////////
  const handleUpdateInstrument = (updatedInstrument) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === updatedInstrument.id ? updatedInstrument : inst
      )
    );
  };

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

  const handleAdd = (newInstrument) => {
    api.post("/instruments", newInstrument).then((res) => {
      setInstruments((prev) => [...prev, res.data]);
    });
  };

  return (
    //   <div className="instruments-container">
    //     <h1 style={{ margin: "auto auto", justifySelf: "center" }}>
    //       Instruments
    //     </h1>

    //     <button onClick={() => setShowModal(true)}>Ajouter Instrument</button>
    //     {/* search instrument by name , location, description */}
    //     <input
    //       type="text"
    //       placeholder="Rechercher un instrument"
    //       style={{
    //         margin: "10px 0",
    //         padding: "8px",
    //         borderRadius: "4px",
    //         border: "1px solid #ccc",
    //       }}
    //       onChange={(e) => {
    //         const query = e.target.value.toLowerCase();
    //         setSearchQuery(query);

    //         // filter instruments
    //         const filtered = instruments.filter(
    //           (instrument) =>
    //             instrument.name.toLowerCase().includes(query) ||
    //             instrument.location?.toLowerCase().includes(query) ||
    //             instrument.description?.toLowerCase().includes(query)
    //         );
    //         setFilteredInstruments(filtered);
    //       }}
    //     />

    //     <datalist>
    //       {filteredInstruments.map((filteredInstrument) => (
    //         <option key={filteredInstrument.id} value={filteredInstrument.name} />
    //       ))}
    //     </datalist>

    //     {showModal && (
    //       <AddInstrumentModal
    //         onClose={() => setShowModal(false)}
    //         onAdd={handleAdd}
    //       />
    //     )}

    //     <div className="instruments-grid">
    //       {instruments.map((instrument) => (
    //         <Instrument
    //           key={instrument.id}
    //           instrument={instrument}
    //           systems={systems}
    //           onDelete={handleDeleteInstrument}
    //           handleInstrumentUpdated={handleUpdateInstrument} // 👈 add this
    //         />
    //       ))}
    //     </div>
    //   </div>
    // );

    <div className="instruments-container">
      <h1 style={{ margin: "auto auto", justifySelf: "center" }}>
        Structures Systemes et Composants
      </h1>
      {/* show add instrument button to admin and superuser only */}
      {(isAdmin() || isSuperuser()) && (
        <button onClick={() => setShowModal(true)}>Ajouter Instrument</button>
      )}

      {/* search instrument by name , location, description */}
      <input
        type="text"
        placeholder="Rechercher un instrument"
        style={{
          margin: "10px 0",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => {
          const query = e.target.value.toLowerCase();
          setSearchQuery(query);

          // filter instruments
          const filtered = instruments.filter(
            (instrument) =>
              instrument.name.toLowerCase().includes(query) ||
              instrument.location?.toLowerCase().includes(query) ||
              instrument.description?.toLowerCase().includes(query)
          );
          setFilteredInstruments(filtered);
        }}
      />

      {/* ✅ link the input to datalist */}
      <datalist id="instrument-options">
        {filteredInstruments.map((filteredInstrument) => (
          <option key={filteredInstrument.id} value={filteredInstrument.name} />
        ))}
      </datalist>

      {showModal && (
        <AddInstrumentModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

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
