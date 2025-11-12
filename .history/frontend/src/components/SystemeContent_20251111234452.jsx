import "./SystemeContent.css";
import SystemCard from "./SystemCard";
import React, { useEffect, useState } from "react";
import { getSystems, deleteSystem } from "../services/systems";
import AddSystemModal from "./AddSystemModal";
import AddInstrumentModal from "./AddInstrumentModal";

// import { SystemsProvider } from "./contexts/SystemsContext";

function SystemContent() {
  const user = JSON.parse(localStorage.getItem("user"));
  function isAdmin() {
    return user?.role === "admin";
  }

  const cardData = [
    { title: "System 1", content: "Details about system 1" },
    { title: "System 2", content: "Details about system 2" },
    { title: "System 3", content: "Details about system 3" },
  ];
  const [systems, setSystems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchSystems = async () => {
    try {
      const data = await getSystems();
      setSystems(data);
    } catch (err) {
      console.error("Error fetching systems:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteSystem(id);
    fetchSystems();
  };

  useEffect(() => {
    fetchSystems();
  }, [systems]);
  const handleNewSystem = (newSystem) => {
    setSystems((prev) => [...prev, newSystem]);
  };

  const handleSystemUpdated = () => {
    // After editing, refresh the entire list
    fetchSystems();
  };

  return (
    <div className="bac">
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <h1 style={{ margin: "auto auto", justifySelf: "center" }}>Systemes</h1>
        {isAdmin() && (
          <button
            className="add_buttom "
            style={{}}
            onClick={() => setShowModal(true)}
          >
            +
          </button>
        )}
      </div>

      <div>
        <AddSystemModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSystemCreated={handleNewSystem}
        />
      </div>
      <div className="card-container">
        {systems.map((system) => (
          <SystemCard
            key={system.id}
            system={system}
            onDelete={handleDelete}
            onEdit={handleSystemUpdated}
          />
        ))}
      </div>
    </div>
  );
}
export default SystemContent;
