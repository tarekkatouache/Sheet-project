import React from "react";
import "./DashboardPageContent.css";

export default function DashboardPageContent() {
  return (
    <div className="DashboardPageContent">
      <div className="up-cards">
        <div className="component-card yellow">
          <div className="card-content">
            <div>
              <h2>2342</h2>
              <p>utilisateurs</p>
            </div>
            <span className="icon">💰</span>
          </div>
          <div className="card-footer">10% changes on profit</div>
        </div>

        <div className="component-card red">
          <div className="card-content">
            <div>
              <h2>145</h2>
              <p>Tasks</p>
            </div>
            <span className="icon">📅</span>
          </div>
          <div className="card-footer">28% task performance</div>
        </div>

        <div className="component-card green">
          <div className="card-content">
            <div>
              <h2>290+</h2>
              <p>Page Views</p>
            </div>
            <span className="icon">📄</span>
          </div>
          <div className="card-footer">10k daily views</div>
        </div>

        <div className="component-card blue">
          <div className="card-content">
            <div>
              <h2>500</h2>
              <p>Downloads</p>
            </div>
            <span className="icon">👍</span>
          </div>
          <div className="card-footer">1k download in App store</div>
        </div>
      </div>
    </div>
  );
}
