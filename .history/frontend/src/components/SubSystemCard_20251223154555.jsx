import React from "react";
import "./SubSystemCard.css";
import { useNavigate } from "react-router-dom";
//  check if the user is admin
function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin";
}
// check if the user is  superuser
function isSuperUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "superuser";
}

export default function SubSystemCard({ subSystem, onDelete }) {
  const navigate = useNavigate();

  // build an array representing U slots (top-to-bottom visual)
  const handleCardClick = () => {
    navigate(
      `/dashboard/instrumentsPerSubSystem/${subSystem.id}/${subSystem.name}`
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
          height: "400px",
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
          {/* $$$$$$$$$$$$$$$$$$$$$$$$ */}
          <div className="div-button-container">
            {isAdmin() && (
              <>
                <button
                  type="button"
                  className="card_button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // setIsEditing(true);
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
                    // onDelete(system.id);
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

            {isSuperUser() && (
              <button
                className="card_button"
                onClick={(e) => {
                  e.stopPropagation();
                  // setIsEditing(true);
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
                console.log("click fiche sub system button ");
                // console.log("SubSystemId:", system.id);
                // handleDisplaySheetSystem(system);
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
          {/* $$$$$$$$$$$$$$$$$$$$$$$$ */}
          {/* <button
            style={{ marginRight: "1a50px" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("click fiche sub system button ");
              console.log("SubSystemId:", subSystem.id);
              handleDisplaySheetSupSystem(subSystem);
            }}
          >
            Fiche
          </button> */}
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
