import React, { useState } from "react";

export default function SearchFilter({ sheets, onFilter }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    // filter sheets using multiple fields
    const filtered = sheets.filter((sheet) => {
      return (
        sheet.description?.toLowerCase().includes(value) ||
        sheet.instrument?.name?.toLowerCase().includes(value) ||
        sheet.user?.name?.toLowerCase().includes(value) ||
        sheet.system?.name?.toLowerCase().includes(value)
      );
    });

    onFilter(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description, instrument, user, system..."
        value={query}
        onChange={handleSearch}
        style={{ padding: "8px", width: "300px" }}
      />
    </div>
  );
}
