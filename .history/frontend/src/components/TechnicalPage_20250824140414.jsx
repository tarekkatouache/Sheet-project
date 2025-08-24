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

  ////////////////////////////////////////////

  // fetch users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
        console.log(" all users:", res);
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

  //////////////////////////////

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

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await api.get("/technical-sheets");
        setSheets(res.data);
        setFilteredSheets(res.data);
      } catch (err) {
        console.error("Error fetching sheets:", err);
      }
    };
    fetchSheets();
  }, []);

  // apply filters whenever search or filters change
  useEffect(() => {
    let filtered = sheets;

    // Search filter
    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title?.toLowerCase().includes(lowerSearch) ||
          s.description?.toLowerCase().includes(lowerSearch)
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
        (s) => String(s.userId) === String(userFilter)
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
  ]);

  return (
    <div className="technical-page">
      <h3>Fiches techniques </h3>

      {/* Filters */}
      <div
        className="filters"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={instrumentFilter}
          onChange={(e) => setInstrumentFilter(e.target.value)}
        >
          <option value="">All Instruments</option>
          {instruments.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.name}
            </option>
          ))}
        </select>

        <select
          value={systemFilter}
          onChange={(e) => setSystemFilter(e.target.value)}
        >
          <option value="">All Systems</option>
          {systems.map((system) => (
            <option key={system.id} value={system.id}>
              {system.name}
            </option>
          ))}
        </select>

        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.lastName}
            </option>
          ))}
        </select>

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
