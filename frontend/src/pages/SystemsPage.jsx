import React, { useEffect, useState } from "react";
import { getSystems, deleteSystem } from "../services/systems";
import SystemCard from "../components/SystemCard";

export default function SystemsPage() {
  const [systems, setSystems] = useState([]);

  const fetchSystems = async () => {
    try {
      const data = await getSystems();
      setSystems(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching systems:", err);
    }
  };

  const handleDelete = async (id) => {
    await deleteSystem(id);
    fetchSystems();
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Systems</h1>

      <div className="grid gap-4">
        {systems.map((system) => (
          <SystemCard
            key={system.id}
            system={system}
            onDelete={handleDelete}
            onEdit={(sys) => console.log("Edit system:", sys)}
          />
        ))}
      </div>
    </div>
  );
}
