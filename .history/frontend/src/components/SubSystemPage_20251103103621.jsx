import React from "react";
import "./SubSystemPage.css";
import SubSystemCard from "./SubSystemCard";
import AddSubSystemModal from "./AddSubSystemModal";
import { useParams } from "react-router-dom";

//fetch all subsystems from the backend
import { getSubSystems } from "../services/subSystems";
import { useState, useEffect } from "react";

export default function SubSystemPage() {
  const [subSystems, setSubSystems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { systemId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await getSubSystems();
      setSubSystems(data);
      console.log("Fetched subsystems:", data);
    }
    fetchData();
  }, []);
  const handleDelete = (deletedSubSystemId) => {
    console.log("Deleting sub system with id:", deletedSubSystemId);
  };
  return (
    <div className="sub-system-page">
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>
        Tous les sous-systèmes
      </h1>
      {/* <button
        style={{ marginBottom: "16px", marginTop: "-12px", marginLeft: "84%" }}
        className="add-button"
        onClick={() => setShowModal(true)}
      >
        Ajoute un sous-système
      </button> */}
      {showModal && (
        <AddSubSystemModal
          onClose={() => setShowModal(false)}
          // onAdd={handleAdd}
        />
      )}
      {/* subsystem listing */}
      <div className="card-container">
        {subSystems.map((subSystem) => (
          <SubSystemCard
            key={subSystem.id}
            SubSystem={subSystem}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
