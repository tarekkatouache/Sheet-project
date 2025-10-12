import React from "react";
import "./SystemCard.css";
import EditSystemModal from "./EditSystemModal";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function SystemCard({ system, onDelete, handleSystemUpdated }) {
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
    // Pass the systemId as state
    navigate(`/dashboard/subSystemsPerSystem`, { state: { systemId } });
    console.log("Navigating to system with ID:", systemId);
    // navigate
    // Redirect to the system detail page
    // window.location.href = `/dashboard/systems/${systemId}`;
    // navigate(`/subsystems/${system.id}`);
  };

  return (
    <div
      key={system.id}
      className="card"
      type="button"
      onClick={() => handleCardClick(system.id)}
    >
      <div className="title">{system.name}</div>
      <div className="icon">
        <i className="fa-thin fa-shield-check"></i>
      </div>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
          eveniet ratione, iste repellat consequuntur porro delectus, excepturi
          cupiditate earum inventore ipsum ut illum facere deleniti incidunt qui
          dolores, iure non
          <br />
          {/* {system.description} */}
        </p>
      </div>
      {isAdmin() && (
        <div className="div-button">
          <button
            className="card_button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
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
          <button className="card_button" onClick={() => setIsEditing(true)}>
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
        <EditSystemModal system={system} onClose={() => setIsEditing(false)} />
      )}
    </div>
  );
}

export default SystemCard;
