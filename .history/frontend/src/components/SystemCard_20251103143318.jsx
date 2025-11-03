import React from "react";
import "./SystemCard.css";
import EditSystemModal from "./EditSystemModal";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SystemCard({ system, onDelete, onEdit }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  function isAdmin() {
    return user?.role === "admin";
  }
  function isSuperuser() {
    return user?.role === "superuser";
  }
  const handleCardClick = (systemId) => {
    // console.log("Navigating to system with ID:", systemId);
    // navigate to subsystemPerSystem with systemId parameter
    // console.log("system name:", system.name);
    console.log("card clicked, system id:", systemId);
    navigate(`/dashboard/subSystems/${systemId}/${system.name}`);
  };
  function handleRefetchSystem() {
    onEdit();
  }

  return (
    <div
      key={system.id}
      className="card"
      onClick={() => handleCardClick(system.id)}
    >
      <div className="title">{system.name}</div>
      <div className="icon">
        <i className="fa-thin fa-shield-check"></i>
      </div>
      <div className="content">
        <p>{system.description}</p>
        <br />
      </div>
      {isAdmin() && (
        <div className="div-button">
          <button
            type="button"
            className="card_button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // Add this for extra safety
              setIsEditing(true);
            }}
          >
            <img
              src="/icons2/compose.png"
              alt="icon
                  
                  "
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
              onDelete(system.id);
            }}
            className="card_button"
          >
            <img
              src="/icons2/delete.png"
              alt="icon
                  
                  "
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
              setIsEditing(true);
            }}
          >
            <img
              src="/icons2/compose.png"
              alt="icon
                  
                  "
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
          system={system}
          onClose={() => setIsEditing(false)}
          onSystemUpdated={handleRefetchSystem}
        />
      )}
    </div>
  );
}

export default SystemCard;
