import React from "react";
import { useParams } from "react-router-dom";
export default function InstrumentsPerSubSystem() {
  const { subSystemName } = useParams();
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "-12px" }}>
        les instruments de {subSystemName}
      </h1>
    </div>
  );
}
