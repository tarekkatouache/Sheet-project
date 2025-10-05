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

export default function AddInstrumentModal({ onClose, onAdd }) {
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
  // TODO : handle the sebmit to add aulomaticly the system id from the selected subsystem
  const handleSubmit = (e) => {
    try {
    // clone formData so we don't accidentally mutate parent state
    const payload = {
      ...formData,
      createdByUserId: userId,
      updatedByUserId: userId,
      // ensure numeric IDs are numbers if your backend expects numbers
      subSystemId: formData.subSystemId ? Number(formData.subSystemId) : null,
      systemId: formData.systemId ? Number(formData.systemId) : null,
    };

    console.log('sending instrument payload:', payload);

    // wait for server response
    const response = await addInstrument(payload);

    // addInstrument might return the created instrument directly or as response.data
    const created = (response && response.data) ? response.data : response;

    console.log('Instrument added:', created);

    // pass created instrument back to parent (prefer response from server, not the local payload)
    onAdd && onAdd(created);

    // close modal
    onClose && onClose();
  } catch (error) {
    // handle duplicate (409) or other server responses
    if (error?.response && error.response.status === 409) {
      console.warn('Duplicate instrument:', error.response.data);
      // show friendly message to user, e.g. toast or set state to show error
      // toast.error(error.response.data.error || 'Instrument already exists');
    } else {
      console.error('Error adding instrument:', error);
      // show generic error to user
    }
  } finally {
    setSubmitting(false);
  }
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

          {/* ✅ SYSTEM SELECT (shows system names, sends ID) */}
          <select
            name="subSystemId"
            value={formData.subSystemId}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un sous-système --</option>
            {/* display all subsystems  */}
            {subSystems &&
              subSystems.map((subSystem) => (
                <option key={subSystem.id} value={subSystem.id}>
                  {(formData.systemId = subSystem.systemId)}
                  {subSystem.name}
                </option>
              ))}

            {/* {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))} */}
          </select>
          <div className="services-container">
            <h4>les Services Concernés :</h4>
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
