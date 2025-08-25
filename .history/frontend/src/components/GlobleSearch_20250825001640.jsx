import React, { useState } from "react";

export default function SheetList({ sheets }) {
  const [search, setSearch] = useState("");

  const filteredSheets = sheets.filter((sheet) => {
    const query = search.toLowerCase();

    return (
      sheet.description?.toLowerCase().includes(query) ||
      sheet.instrument?.name?.toLowerCase().includes(query) ||
      sheet.user?.name?.toLowerCase().includes(query) ||
      sheet.system?.name?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search sheets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <ul>
        {filteredSheets.map((sheet) => (
          <li key={sheet.id}>
            <strong>{sheet.description}</strong> – {sheet.instrument?.name} –{" "}
            {sheet.user?.name} – {sheet.system?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
