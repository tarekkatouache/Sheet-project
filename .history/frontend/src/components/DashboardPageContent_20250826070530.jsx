import React from "react";
import "./DashboardPageContent.css";
import { getUploadFolderSize } from "../services/storege";

// get the upload folder size
const fetchUploadFolderSize = async () => {
  const data = await getUploadFolderSize();
  console.log("data", data);
  return data.sizeInBytes;
};
const siz = await fetchUploadFolderSize();

console.log("Upload folder siz :", siz);
///////////////////////
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = (bytes / Math.pow(1024, i)).toFixed(2);
  return `${val} ${units[i]}`;
} ////////////////////////////////////

const quotaBytes = 1 * 1024 * 1024 * 1024; // 1 GB quota
const sizeInBytes = siz + 390000000; // 1 GB
const sizeFormatted = formatBytes(sizeInBytes);

export default function DashboardPageContent() {
  const pct = Math.min(100, Math.round((sizeInBytes / quotaBytes) * 100));
  const quotaFormatted = formatBytes(quotaBytes);
  const status = pct >= 85 ? "danger" : pct >= 65 ? "warn" : "ok"; // pct : pourcentage

  return (
    <div className="ContenT">
      <div
        // style={{ backgroundColor: "red" }}
        className="DashboardUpCardsContent"
      >
        <div className="up-cards">
          <div className="component-card yellow">
            <div className="card-content">
              <div>
                <h2>2342</h2>
              </div>
              <span className="icon">💰</span>
            </div>
            <div className="card-footer">
              <p>Utilisateurs</p>
            </div>
          </div>

          <div className="component-card red">
            <div className="card-content">
              <div>
                <h2>145</h2>
              </div>
              <span className="icon">📅</span>
            </div>
            <div className="card-footer">
              <p>Fiche Technique</p>
            </div>
          </div>

          <div className="component-card green">
            <div className="card-content">
              <div>
                <h2>290</h2>
              </div>
              <span className="icon">📄</span>
            </div>
            <div className="card-footer">
              <p>Instrument</p>
            </div>
          </div>

          <div className="component-card blue">
            <div className="card-content">
              <div>
                <h2>500</h2>
              </div>
              <span className="icon">👍</span>
            </div>
            <div className="card-footer">le nombre total de vues.</div>
            {/* numbers of downloads word or consulter PDF */}
          </div>
        </div>
      </div>
      <div
        // style={{ backgroundColor: "green" }}
        className="DashboardmidleCardsContent"
      >
        {/* // Storage usage container */}
        <div
          className={`storage-card ${status}`}
          style={{
            // expose values to CSS as custom properties
            // percent is used to draw the conic-gradient
            // label is shown inside the ring
            "--pct": pct,
          }}
        >
          <div className="ring" aria-label={`Storage used ${pct}%`}>
            <div className="ring__center">
              <div className="ring__value">{pct}%</div>
              <div className="ring__label">Used</div>
            </div>
          </div>
          <div className="info">
            <div className="kv">
              <span>Utilisé</span>
              <strong>{sizeFormatted}</strong>
            </div>
            <div className="kv">
              <span>Quota</span>
              <strong>{quotaFormatted}</strong>
            </div>

            <div
              className="bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <div className="bar__fill" style={{ width: `${pct}%` }} />
            </div>

            <div className="legend">
              <span className="dot ok" /> OK
              <span className="dot warn" /> Alerte
              <span className="dot danger" /> Critique
            </div>
          </div>
          <h3
            style={{
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              color: "#6f6e6eff",
              backgroundColor: "",
              display: "flex",
              marginLeft: "5px",
              justifyContent: "center",
            }}
          >
            Stockage
          </h3>
          <img
            src="/dashbord_icons/database.png"
            alt="icon
                  
                  "
            style={{
              display: "block",
              // filter: "invert(1) brightness(1.5) contrast(1.2)",
              width: "60px",
              padding: "2px",
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
}
