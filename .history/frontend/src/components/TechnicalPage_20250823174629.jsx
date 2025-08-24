import React, { use, useEffect, useState } from "react";
import TechnicalSheet from "./TechnicalSheet";
import api from "../services/api";
import { getSystems } from "../services/systems";
import { deleteTechnicalSheet } from "../services/technicalSheet";

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
  // fetch systems to put them in the filter select
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const res = await getSystems();
        setSystems(res.data);
        console.log("All systems:", res.data[0].name);
      } catch (err) {
        console.error("Error fetching systems:", err);
      }
    };
    fetchSystems();
  }, []);
  ////////////////////////fetching systems

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

    if (search.trim()) {
      filtered = filtered.filter(
        (s) =>
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (instrumentFilter) {
      filtered = filtered.filter(
        (s) => s.instrumentId === parseInt(instrumentFilter)
      );
    }

    if (systemFilter) {
      filtered = filtered.filter((s) => s.systemId === parseInt(systemFilter));
    }

    if (userFilter) {
      filtered = filtered.filter((s) => s.userId === parseInt(userFilter));
    }

    if (dateFilter) {
      filtered = filtered.filter(
        (s) => new Date(s.createdAt).toISOString().split("T")[0] === dateFilter
      );
    }

    setFilteredSheets(filtered);
  }, [search, instrumentFilter, systemFilter, userFilter, dateFilter, sheets]);

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
          {/* Example: populate dynamically if you have instruments list */}
          <option value="1">Instrument 1</option>
          <option value="2">Instrument 2</option>
        </select>

        <select
          value={systemFilter}
          onChange={(e) => setSystemFilter(e.target.value)}
        >
          <option value="">-- Sélectionner un système --</option>
          {/* {console.log("Allsystems:", Allsystems)} */}
        </select>

        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        >
          <option value="">All Users</option>
          <option value="1">User Zaki</option>
          <option value="2">User Admin</option>
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
