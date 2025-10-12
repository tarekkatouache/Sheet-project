import React from "react";
import "./SubSystemPage.css";
import SubSystemCard from "./SubSystemCard";
import AddSubSystemModal from "./AddSubSystemModal";
import { useParams } from "react-router-dom";

//fetch all subsystems from the backend
import { getSubSystems } from "../services/subSystems";
import { useState, useEffect } from "react";
import { getSubSystemsBySystemId } from "../services/subSystems";

export default function SubsystemsPerSystem() {
  console.log("In SubsystemsPerSystem component");
  const [subSystems, setSubSystems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { systemId } = useParams();
  const { systemName } = useParams();

  // create handleAdd function and to use in useEffect to update the subsystems list when a new subsystem is added

  // use effect to fetch subsystems when OnAdd in AddSubSystemModal is triggered and show the new subsystem in the list
  const handleAdd = (newSubSystem) => {
    setSubSystems((prevSubSystems) => [...prevSubSystems, newSubSystem]);
  };
  //use handleAdd in AddSubSystemModal`s onAdd prop
  // get systemid from params of url
  useEffect(() => {
    async function fetchData() {
      const data = await getSubSystemsBySystemId(systemId);
      console.log("Fetched subsystems for systemId", systemId, data);
      setSubSystems(data);
    }
    fetchData();
  }, []);
  // console.log("subSystems:", subSystems);
  return (
    <div className="sub-system-page">
      <h1 style={{ textAlign: "center", marginBottom: "-12px" }}>
        Sous-systèmes de systeme {systemName}
      </h1>
      <button
        style={{ marginBottom: "16px", marginTop: "-12px", marginLeft: "84%" }}
        className="add-button"
        onClick={() => setShowModal(true)}
      >
        Ajoute un sous-système
      </button>
      {showModal && (
        <AddSubSystemModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
      <div className="card-container">
        {subSystems.map((subSystem) => (
          <SubSystemCard
            key={subSystem.id}
            name={subSystem.name}
            description={subSystem.description}
            salle={subSystem.salle}
            Batiment={subSystem.Batiment}
            system={subSystem.system}
          />
        ))}
      </div>
    </div>
  );
}
