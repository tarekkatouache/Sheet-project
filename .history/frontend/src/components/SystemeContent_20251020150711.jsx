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
  }, []);
  const handleNewSystem = (newSystem) => {
    setSystems((prev) => [...prev, newSystem]);
  };

  const handleSystemUpdated = () => {
    // After editing, refresh the entire list
    fetchSystems();
  };

  return (
    <div className="back">
      {/* background video */}
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/fallback.jpg"
        controls
        onError={(e) => {
          console.error("Video error: ", e);
          const vid = e.currentTarget;
          console.log("Video src:", vid.currentSrc);
        }}
        onLoadedData={() => console.log("Video loaded and ready to play")}
      >
        <source
          src="public/background_IMGs/Hailuo_Video.webm"
          type="video/webm"
        />
        <source
          src="public/background_IMGs/Hailuo_Video.mp4"
          type="video/mp4"
        />
      </video>

      {/* optional dimming overlay for better text contrast */}
      <div className="bg-overlay" aria-hidden="true" />

      <header className="page-header">
        <h1>Systemes</h1>

        {isAdmin() && (
          <button
            className="add_button"
            onClick={() => setShowModal(true)}
            aria-label="Add system"
            title="Add system"
          >
            +
          </button>
        )}
      </header>

      <AddSystemModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSystemCreated={handleNewSystem}
      />

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
