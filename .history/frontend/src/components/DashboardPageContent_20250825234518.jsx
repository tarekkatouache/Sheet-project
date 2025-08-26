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
            style={{ backgroundColor: "#8f5d36ff" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side"> XXXX number</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#9746460 0" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side">Total Fiche</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#71a271ff" }}
          ></div>
        </div>
        <div className="component-card">
          <div className="up-side">Total Instrument</div>
          <div
            className="down-side"
            style={{ backgroundColor: "#3a4960ff" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
