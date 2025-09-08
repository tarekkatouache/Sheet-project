import React, { useState, useEffect } from "react";
import "./AddInstrumentModal.css";
import axios from "axios";
import { getSystems } from "../services/systems";
import ReactDOM from "react-dom";

export default function AddInstrumentModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    instrumentId: "",
    location: "",
    description: "",
    systemId: "",
    services: [],
  });
  /////// fetching systems

  ///////////////
  const [systems, setSystems] = useState([]);
  // const [selectedServices, setSelectedServices] = useState([]);

  const services = ["SMICC", "SMM", "SME", "Utilitaire", "HALL", "SOB", "SOR"];

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
    console.log("formData:", formData);

    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">
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
          <div className="services-container">
            <h4>les Services Concerne:</h4>
            <div className="services-grid">
              {services.map((service) => (
                <label key={service} className="service-option">
                  <input
                    type="checkbox"
                    value={service}
                    checked={(formData.services || []).includes(service)}
                    onChange={() => {
                      // add service if not present, remove if present to the services in the formdata state
                      setFormData((prev) => {
                        const services = prev.services || [];

                        // If service is already checked, remove it
                        if (services.includes(service)) {
                          return {
                            ...prev,
                            services: services.filter((s) => s !== service),
                          };
                        }
                        // Otherwise add it
                        else {
                          console.log("Toggling service:", formData.services);
                          return {
                            ...prev,
                            services: [...services, service],
                          };
                        }
                      });
                    }}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>

            <p className="selected-services">
              {formData.services.join(", ") || ""}
            </p>
          </div>
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
