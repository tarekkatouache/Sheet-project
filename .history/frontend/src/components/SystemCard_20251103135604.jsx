import React from "react";
import "./SystemCard.css";
import EditSystemModal from "./EditSystemModal";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
function SystemCard({ system, onDelete, handleSystemUpdated }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentSystem, setCurrentSystem] = useState(system);
  const user = JSON.parse(localStorage.getItem("user"));

  // Update the card when the system prop changes
  useEffect(() => {
    setCurrentSystem(system);
  }, [system]);

  function isAdmin() {
    return user?.role === "admin";
  }

  function isSuperuser() {
    return user?.role === "superuser";
  }

  const handleCardClick = (systemId) => {
    console.log("card clicked, system id:", systemId);
    navigate(`/dashboard/subSystems/${systemId}/${currentSystem.name}`);
  };

  const handleSystemUpdate = (updatedSystem) => {
    setCurrentSystem(updatedSystem); // Update local state
    handleSystemUpdated(updatedSystem); // Notify parent component
  };

  return (
    <div
      key={currentSystem.id}
      className="card"
      onClick={() => handleCardClick(currentSystem.id)}
    >
      <div className="title">{currentSystem.name}</div>
      <div className="icon">
        <i className="fa-thin fa-shield-check"></i>
      </div>
      <div className="content">
        <p>
          {currentSystem.description ||
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit..."}
        </p>
      </div>

      {isAdmin() && (
        <div className="div-button">
          <button
            type="button"
            className="card_button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            <img
              src="/icons2/compose.png"
              alt="icon"
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete(currentSystem.id);
            }}
            className="card_button"
          >
            <img
              src="/icons2/delete.png"
              alt="icon"
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>
        </div>
      )}

      {isSuperuser() && (
        <div className="div-button">
          <button
            className="card_button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            <img
              src="/icons2/compose.png"
              alt="icon"
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>
        </div>
      )}

      {isEditing && (
        <EditSystemModal
          system={currentSystem}
          onClose={() => setIsEditing(false)}
          onSystemUpdated={handleSystemUpdate}
        />
      )}
    </div>
  );
}

export default SystemCard;
