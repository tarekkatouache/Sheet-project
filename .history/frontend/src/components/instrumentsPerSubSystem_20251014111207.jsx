import React from "react";
import { useParams } from "react-router-dom";
export default function InstrumentsPerSubSystem() {
  const { subSystemName } = useParams();
  return <div>les instruments de {subSystemName}</div>;
}
