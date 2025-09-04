import React, { useState, useEffect } from "react";
import "./AddInstrumentModal.css";
import axios from "axios";
import { getSystems } from "../services/systems";
import ReactDOM from "react-dom";

export default function AddInstrumentModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    instrumentId: "",
    location: "",
    description: "",
    systemId: "",
  });
  /////// fetching systems

  ///////////////
  const [systems, setSystems] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const services = ["SMICC", "SMM", "SME", "SOR", "SOB"];

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
  ////////////////////////////
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeService = (service) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service) // remove if already selected
          : [...prev, service] // add if not selected
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        {/* add services conserns */}
        <div>
          <h3>Select Services:</h3>
          {services.map((service) => (
            <label key={service} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={service}
                checked={selectedServices.includes(service)}
                onChange={() => handleChangeService(service)}
              />
              {service}
            </label>
          ))}

          <p>Selected: {selectedServices.join(", ")}</p>
        </div>
        <h2>Ajouter un Instrument</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom de l'instrument"
            required
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Emplacement"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          {/* <input
            name="systemId"
            value={formData.systemId}
            onChange={handleChange}
            placeholder="Systeme Id"
            required
          /> */}
          {/* ✅ SYSTEM SELECT (shows system names, sends ID) */}
          <select
            name="systemId"
            value={formData.systemId}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un système --</option>
            {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
