import React, { useState, useEffect } from "react";
import "./AddInstrumentModal.css";
import axios, { formToJSON } from "axios";
import { getSubSystems } from "../services/subSystems";
import { addInstrument } from "../services/instruments";
//using portals
import ReactDOM from "react-dom";

//get user id from local storage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;

export default function AddSubSystemModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    room: "",
    building: "",
    services: [],
    createdByUserId: null,
    updatedByUserId: null,
    instrumentId: "",
    subSystemId: "",
    systemId: "",
  });
  /////// fetching systems

  ///////////////

  const [systems, setSystems] = useState([]);
  const [subSystems, setSubSystems] = useState("");

  //////////////

  const services = ["SMICC", "SMM", "SME", "Utilitaire", "HALL", "SOB", "SOR"];
  useEffect(() => {
    const fetchSubSystems = async () => {
      try {
        const data = await getSubSystems();
        setSubSystems(data);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };

    fetchSubSystems();
  }, []);
  console.log("subSystems:", subSystems);
  ////////////////////////////
  const handleChange = (e) => {
    console.log(
      "Changing formData:",
      e.target.name,
      e.target.value,
      "formData",
      formData
    );
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    // add createdByUserId and updatedByUserId to formData
    formData.createdByUserId = userId;
    formData.updatedByUserId = userId;

    console.log(" form data : ", formData);
    addInstrument(formData)
      .then((response) => {
        console.log("Instrument added:", response);
        onAdd(formData);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding instrument:", error);
      });
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Ajouter un Sous Système</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom de le sous système"
            required
          />
          <input
            name="code"
            value={formData.room}
            onChange={handleChange}
            placeholder="Type de sous système (armoire, pompe)"
            required
          />
          <input
            name="room"
            value={formData.room}
            onChange={handleChange}
            placeholder="Salle"
            required
          />

          <input
            name="building"
            value={formData.building}
            onChange={handleChange}
            placeholder="Bâtiment"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <div className="modal-actions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
        {/* add services conserns */}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
