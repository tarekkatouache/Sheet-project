import React from "react";
import "./SubSystemPage.css";
import SubSystemComponent from "./SubSystemComponent";
import ServerRackCard from "./ServerRackCard";

export default function SubSystemPage() {
  return (
    <div className="sub-system-page">
      <h1>Sub System Page</h1>
      <ServerRackCard
        name="Rack A1"
        location="Data Center 1 - Row 2"
        uCount={42}
        infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
        showSlots={true}
      />
      {/* <SubSystemComponent
        subSystem={{
          id: 1,
          name: "Sub System 1",
          description: "Description 1",
        }}
        onViewInstruments={(id) => console.log("View Instruments", id)}
        onEdit={(subSystem) => console.log("Edit", subSystem)}
        onDelete={(id) => console.log("Delete", id)}
      /> */}
    </div>
  );
}
