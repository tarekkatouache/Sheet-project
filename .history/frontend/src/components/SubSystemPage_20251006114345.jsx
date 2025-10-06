import React from "react";
import "./SubSystemPage.css";
import SubSystemCard from "./SubSystemCard";

export default function SubSystemPage() {
  return (
    <div className="sub-system-page card-container">
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      <SubSystemCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
    </div>
  );
}
