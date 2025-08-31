import React, { use, useEffect, useState } from "react";
import TechnicalSheet from "./TechnicalSheet";
import api from "../services/api";
import { getSystems } from "../services/systems";
import { deleteTechnicalSheet } from "../services/technicalSheet";
import { getAllUsers } from "../services/user";

export default function TechnicalPage() {
  const [sheets, setSheets] = useState([]);
  const [filteredSheets, setFilteredSheets] = useState([]);

  // filters
  const [search, setSearch] = useState("");
  const [instrumentFilter, setInstrumentFilter] = useState("");
  const [systemFilter, setSystemFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [referenceFilter, setReferenceFilter] = useState("");
  const [references, setReferences] = useState([]);

  ////////////////////////////////////////////
  // for th globle search //

  ///////////////
  // fetch all references

  ////////////
  // fetch users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  ///////////////////////////
  // fetch systems to put them in the filter select
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const res = await getSystems();
        setSystems(res);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };
    fetchSystems();
  }, []);
  ////////////////////////fetching systems
  // fetch all instruments to put them in the filter select
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const res = await api.get("/instruments");
        setInstruments(res.data);
      } catch (err) {
        console.error("Error fetching instruments:", err);
      }
    };
    fetchInstruments();
  }, []);

  //////////////

  ////////////////

  // handle delete here also
  const handleDelete = async (Id) => {
    console.log("Deleting sheet with id from techpage:", Id);
    //delete sheet only by admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert(
        "Vous n'êtes pas autorisé à supprimer cette feuille, veuillez contacter l'administrateur"
      );
      console.error("Unauthorized delete attempt");
      return;
    }

    deleteTechnicalSheet(Id);
    // optimistically update the state
    setFilteredSheets((prev) => prev.filter((sheet) => sheet.id !== Id));
  };
  // fetch sheets
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await api.get("/technical-sheets");
        setSheets(res.data);
        setFilteredSheets(res.data);
        // Log all references from sheets using map
        res.data.forEach((s) => {
          // console.log(`Sheet ID references: ${s.reference}`);
          setReferences((prev) => [...prev, s.reference]);
          console.log(`Updated references state: ${s.reference}`);
        });
      } catch (err) {
        console.error("Error fetching sheets:", err);
      }
    };
    fetchSheets();
  }, []);
  // Log the updated references state after 1 second

  // apply filters whenever search or filters change
  useEffect(() => {
    let filtered = sheets;

    // Search filter with system description || system name || instrument description || instrument Location ||
    if (search) {
      console.log("Applying search filter:", search);
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter();
    }
    // reference filter
    if (referenceFilter) {
      filtered = filtered.filter((s) =>
        s.reference.toLowerCase().includes(referenceFilter.toLowerCase())
      );
    }

    // Instrument filter
    if (instrumentFilter) {
      filtered = filtered.filter(
        (s) => String(s.instrumentId) === String(instrumentFilter)
      );
    }

    // System filter (via instrument relation)
    if (systemFilter) {
      filtered = filtered.filter((s) => {
        const instrument = instruments.find(
          (inst) => inst.id === s.instrumentId
        );
        return (
          instrument && String(instrument.systemId) === String(systemFilter)
        );
      });
    }

    // User filter
    if (userFilter) {
      filtered = filtered.filter(
        (s) => String(s.uploadedByUserId) === String(userFilter)
      );
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(
        (s) => new Date(s.createdAt).toISOString().split("T")[0] === dateFilter
      );
    }

    setFilteredSheets(filtered);
  }, [
    search,
    instrumentFilter,
    systemFilter,
    userFilter,
    dateFilter,
    sheets,
    instruments,
    referenceFilter,
  ]);
  ///////////////////////

  return (
    <div className="technical-page">
      <h3>Fiches techniques </h3>

      {/* Filters  */}
      <div
        className="filters"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        {/* <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

        {/* instrument filter with datalist  (searchable + writable)  */}
        <div>
          <input
            style={{ width: "200px" }}
            list="instruments"
            placeholder="All Instruments"
            onChange={(e) => {
              const val = e.target.value;

              if (!val) {
                setInstrumentFilter("");
                return;
              }

              // Match name to ID
              const match = instruments.find(
                (inst) => inst.name.toLowerCase() === val.toLowerCase()
              );
              setInstrumentFilter(match ? String(match.id) : "");
            }}
          />

          <datalist id="instruments">
            {instruments.map((inst) => (
              <option key={inst.id} value={inst.name} />
            ))}
          </datalist>
        </div>

        {/* System filter with datalist (searchable + writable) */}
        <div>
          <input
            style={{ width: "200px" }}
            list="systems"
            placeholder="All Systems"
            onChange={(e) => {
              const val = e.target.value;

              if (!val) {
                setSystemFilter("");
                return;
              }

              // Match name to ID
              const match = systems.find(
                (s) => s.name.toLowerCase() === val.toLowerCase()
              );
              setSystemFilter(match ? String(match.id) : "");
            }}
          />

          <datalist id="systems">
            {systems.map((system) => (
              <option key={system.id} value={system.name} />
            ))}
          </datalist>
        </div>
        {/* users filter with datalist  (searchable + writable)  */}
        <div>
          <input
            style={{ width: "200px" }}
            list="users"
            placeholder="All Users"
            onChange={(e) => {
              const val = e.target.value;

              if (!val) {
                setUserFilter("");
                return;
              }

              // Match name to ID
              const match = users.find(
                (u) => u.name.toLowerCase() === val.toLowerCase()
              );
              setUserFilter(match ? String(match.id) : "");
            }}
          />

          <datalist id="users">
            {users.map((u) => (
              <option key={u.id} value={u.name} />
            ))}
          </datalist>
        </div>

        {/* Reference filter */}

        <div>
          <input style={{ width: "200px" }} list="references"></input>
          <datalist id="references">
            {references.map((ref) => (
              <option key={ref} value={ref} />
            ))}
          </datalist>
        </div>

        {/* Date filter */}

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Sheets listing */}
      <div className="sheets-grid">
        {filteredSheets.length > 0 ? (
          filteredSheets.map((sheet) => (
            <TechnicalSheet
              key={sheet.id}
              sheet={sheet}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No technical sheets found.</p>
        )}
      </div>
    </div>
  );
}
