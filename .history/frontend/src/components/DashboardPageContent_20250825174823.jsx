import React from "react";
import "./DashboardPageContent.css";

export default function DashboardPageContent() {
  return (
    <div className="DashboardPageContent">
      <div className="Up-Cards">
        <div className="component-card">
          <div className="up-side">Utilisateur</div>
          <div className="down-side"></div>
        </div>
        <div className="component-card">
          <div className="up-side"> number</div>
          <div className="down-side"></div>
        </div>
        <div className="component-card">
          <div className="up-side">Total Sheets</div>
          <div className="down-side"></div>
        </div>
        <div className="component-card">
          <div className="up-side"> Total Instrument</div>
          <div className="down-side"></div>
        </div>
      </div>
    </div>
  );
}
