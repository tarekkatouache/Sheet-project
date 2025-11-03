import React from "react";
import "./SubSystemCard.css";
import { useNavigate } from "react-router-dom";

export default function SubSystemCard({ subSystem, onDelete }) {
  const navigate = useNavigate();

  // build an array representing U slots (top-to-bottom visual)
  const handleCardClick = () => {
    navigate(
      `/dashboard/instrumentsPerSubSystem/${subSystem.pdfPathFile}/${subSystem.name}`
    );
    console.log("sub system card clicked");
  };
  function handleDisplaySheetSupSystem(subSystem) {
    console.log("Opening PDF at path:", subSystem.pdfPathFile);
    window.open(`http://localhost:5000/${subSystem.pdfPathFile}`, "_blank");
    // console.log("SubSystem $$$$$$$$$", Subsystem);
  }

  return (
    <div
      className="rack-card"
      onClick={() => {
        handleCardClick();
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
                <p>sous systeme :{subSystem.name}</p>
                {/* <h1>{Subsystem.name}</h1> */}
              </div>
              <div className="info-row" style={{ marginTop: 8 }}>
                <strong>
                  <h2>Localisation </h2>
                  <p>Batiment : {subSystem.building}</p>
                  <p>salle : {subSystem.room}</p>
                </strong>
              </div>
            </div>
            <div className="rack-visual" aria-hidden>
              {/* <p>{Subsystem.description}</p> */}
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
            style={{ marginRight: "1a50px" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("click fiche sub system button ");
              console.log("SubSystemId:", subSystem.id);
              handleDisplaySheetSupSystem(subSystem);
            }}
          >
            Fiche
          </button>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("click instruments sub system button ");
            }}
          >
            Instruments
          </button> */}
        </div>
      </div>
    </div>
  );
}
