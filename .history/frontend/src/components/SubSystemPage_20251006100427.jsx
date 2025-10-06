import React from "react";
import "./SubSystemPage.css";
import SubSystemComponent from "./SubSystemComponent";

export default function SubSystemPage() {
  return (
    <div className="sub-system-page">
      <h1>Sub System Page</h1>
      <SubSystemComponent
        subSystem={{
          id: 1,
          name: "Sub System 1",
          description: "Description 1",
        }}
        onViewInstruments={(id) => console.log("View Instruments", id)}
        onEdit={(subSystem) => console.log("Edit", subSystem)}
        onDelete={(id) => console.log("Delete", id)}
      />
    </div>
  );
}
