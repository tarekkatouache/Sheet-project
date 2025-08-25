import React, { useState } from "react";
import SearchBar from "./SearchBar";
import TechnicalSheet from "./TechnicalSheet";

export default function SearchPage({ sheets }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtering logic across all fields
  const filteredSheets = sheets.filter((sheet) => {
    const search = searchTerm.toLowerCase();
    return (
      sheet.description?.toLowerCase().includes(search) ||
      sheet.instrument?.name?.toLowerCase().includes(search) ||
      sheet.user?.name?.toLowerCase().includes(search) ||
      sheet.system?.name?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Technical Sheets</h1>

      {/* Search input */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Results */}
      <TechnicalSheet sheets={filteredSheets} />
    </div>
  );
}
