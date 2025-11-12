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
  const handleopenficheClick = (systemId) => {
    console.log("Opening fiche for system ID:", systemId);
    navigate(`/dashboard/systemFiche/${systemId}`);
  };

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

      {/* ✅ all buttons in one line */}
      <div className="div-button-container">
        {isAdmin() && (
          <>
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
                alt="edit"
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
                alt="delete"
                style={{
                  filter: "invert(1) brightness(1.5) contrast(1.2)",
                  width: "20px",
                  padding: "2px",
                }}
              />
            </button>
          </>
        )}

        {isSuperuser() && (
          <button
            className="card_button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            <img
              src="/icons2/compose.png"
              alt="edit"
              style={{
                filter: "invert(1) brightness(1.5) contrast(1.2)",
                width: "20px",
                padding: "2px",
              }}
            />
          </button>
        )}

        {/* Always visible button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.stopPropagation();
            console.log("click fiche sub system button ");
            console.log("SubSystemId:", subSystem.id);
            handleDisplaySheetSystem(subSystem);
          }}
          className="card_button"
        >
          <img
            src="/icons2/sheet2.png"
            alt="sheet"
            style={{
              filter: "invert(1) brightness(1.5) contrast(1.2)",
              width: "20px",
              padding: "2px",
            }}
          />
        </button>
      </div>

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
