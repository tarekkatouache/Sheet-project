import React from "react";
import "./DashboardPageContent.css";

export default function DashboardPageContent() {
  return (
    <div className="DashboardPageContent">
      <div className="Up-Cards">
        <div className="component-card">
          <div className="up-side">Utilisateur</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#f48836" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side"> XXXX number</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#ff0000ff" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side">Total Fiche</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#1d4e1eff" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side">Total Instrument</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#f48836" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
