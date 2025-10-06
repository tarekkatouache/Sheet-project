export default function AddSubSystemModal({}) {
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
