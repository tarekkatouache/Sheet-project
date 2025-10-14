import React from "react";
import "./SubSystemCard.css";
import { useNavigate } from "react-router-dom";
// import SubSystem from "../../../backend/models/SubSystem";

/**
 * ServerRackCard.jsx
 * A small, self-contained React component (single file) that visually represents
 * an empty server rack and displays rack name + info. Uses pure CSS (no Tailwind).
 *
 * Props:
 *  - name: string (rack name/title)
 *  - location: string
 *  - uCount: number (U size, e.g. 42)
 *  - infoLines: array of strings (additional lines to show)
 *  - showSlots: boolean (render empty U slots)
 *
 * Usage:
 *  <ServerRackCard
 *    name="Rack A1"
 *    location="Data Center 1 - Row 2"
 *    uCount={42}
 *    infoLines={["Owner: Ops Team", "Last Audit: 2025-09-01"]}
 *    showSlots={true}
 *  />
 */

export default function SubSystemCard({
  SubSystemId = "",
  name = "Sub System",
  description = "Description du sous systeme",
  salle = "—",
  Batiment = "42",
  system = [],
  showSlots = true,
}) {
  const navigate = useNavigate();

  // build an array representing U slots (top-to-bottom visual)
  const handleCardClick = () => {
    console.log("Navigating to instruments page of this sub system");
    navigate(`/dashboard/instrumentsPerSubSystem/${SubSystemId}${name}`);
  };
  return (
    <div
      className="rack-card"
      onClick={() => {
        handleCardClick();
        console.log("click sub system card");
      }}
    >
      <style>{}</style>
      <div
        className="insider"
        style={{
          backgroundColor: "#eff1eaff",
          padding: 8,
          borderRadius: 2,
          border: "6px solid rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="rack-header">
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: "#071a2a",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          />
          <div>
            {/* <div className="rack-title">{name}</div> */}
            {/* <div className="rack-sub">{location}</div> */}
          </div>
        </div>

        <div className="rack-body">
          <div className="rack-info">
            <div className="info-block">
              <div className="info-row">
                <p>sous systeme :</p>
                <h1>{name}</h1>
              </div>
              <div className="info-row" style={{ marginTop: 8 }}>
                <strong>
                  <h2>Localisation </h2>
                  <p>Batiment : ######</p>
                  <p>salle : ######</p>
                </strong>
              </div>
            </div>
            <div className="rack-visual" aria-hidden>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div
          className="rack-footer"
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("click fiche sub system button ");
            }}
          >
            Fiche
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("click instruments sub system button ");
            }}
          >
            Instruments
          </button>
        </div>
      </div>
    </div>
  );
}
