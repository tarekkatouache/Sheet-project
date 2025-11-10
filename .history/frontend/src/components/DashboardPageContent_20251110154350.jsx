import React from "react";
import "./DashboardPageContent.css";
import { getUploadFolderSize } from "../services/storege";
import { getAllUsers } from "../services/user";
import { getAllTechnicalSheets } from "../services/technicalSheet";
import { getInstruments } from "../services/instruments";
import { useEffect } from "react";
import { getLengthAuditLogs } from "../services/auditLogs";
import { getAuditLogs } from "../services/auditLogs";

// get the upload folder size
const fetchUploadFolderSize = async () => {
  const data = await getUploadFolderSize();
  return data.sizeInBytes;
};
const siz = await fetchUploadFolderSize();

///////////////////////
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const val = (bytes / Math.pow(1024, i)).toFixed(2);
  return `${val} ${units[i]}`;
} ////////////////////////////////////

const quotaBytes = 10.24 * 1024 * 1024; // 10 MB quota
// const quotaBytes = 1 * 1024 * 1024 * 1024; // 1 GB quota
const sizeInBytes = siz; // 1 GB
const sizeFormatted = formatBytes(sizeInBytes);

export default function DashboardPageContent() {
  const pct = Math.min(100, Math.round((sizeInBytes / quotaBytes) * 100));
  const quotaFormatted = formatBytes(quotaBytes);
  const status = pct >= 85 ? "danger" : pct >= 65 ? "warn" : "ok"; // pct : pourcentage
  // get all users ,technical sheets and set user counter
  const [userCount, setUserCount] = React.useState(0);
  const [sheetCount, setSheetCount] = React.useState(0);
  const [instrumentCount, setInstrumentCount] = React.useState(0);
  const [auditLogCount, setAuditLogCount] = React.useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();

      setUserCount(users.length);
      const sheets = await getAllTechnicalSheets();
      setSheetCount(sheets.length);
      const instruments = await getInstruments();
      setInstrumentCount(instruments.length);
    };
    fetchUsers();
  }, []);
  // console.log("User count:", userCount.toString());

  // console.log("Sheet count:", sheetCount.toString());
  // fetch audit logs lenth
  useEffect(() => {
    console.log("Fetching audit logs length...");
    const fetchAuditLogsLength = async () => {
      const auditLogs = await getAuditLogs();
      setAuditLogCount(auditLogs.length);
      console.log("Audit log count:", auditLogs.length);
    };
    fetchAuditLogsLength();
  }, []);
  console.log("Audit log count state:", auditLogCount);

  return (
    <div className="ContenT">
      <div
        // style={{ backgroundColor: "red" }}
        className="DashboardUpCardsContent"
      >
        <div className="up-cards">
          {/* users number card */}
          <div className="component-card yellow">
            <div className="card-content">
              <div>
                <h2>{userCount ? userCount : 0}</h2>
              </div>
              <span className="icon">
                <img
                  src="/dashbord_icons/group.png"
                  alt="icon
                    
                    "
                  style={{
                    display: "block",
                    // filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "60px",
                    padding: "2px",
                  }}
                />
              </span>
            </div>
            <div className="card-footer">
              <p>Utilisateurs</p>
            </div>
          </div>

          {/* technical sheet card */}
          {/* systems card */}
          <div className="component-card blue">
            <div className="card-content">
              <div>
                <h2>{auditLogCount ? auditLogCount : 0}</h2>
              </div>
              <span className="icon">
                {" "}
                <img
                  src="/dashbord_icons/documentation.png"
                  alt="icon
                    
                    "
                  style={{
                    display: "block",
                    // filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "60px",
                    padding: "2px",
                  }}
                />
              </span>
            </div>
            <div className="card-footer">Systemes</div>
            {/* numbers of downloads word or consulter PDF */}
          </div>

          <div className="component-card red">
            <div className="card-content">
              <div>
                <h2>{sheetCount ? sheetCount : 0}</h2>
              </div>
              <span className="icon">
                {" "}
                <img
                  src="/dashbord_icons/document.png"
                  alt="icon
                    
                    "
                  style={{
                    display: "block",
                    filter: "invert(1) brightness(1.8) contrast(1.6)",
                    width: "60px",
                    padding: "2px",
                  }}
                />
              </span>
            </div>
            <div className="card-footer">
              <p>Fiche Technique</p>
            </div>
          </div>
          {/* instrument card */}
          <div className="component-card green">
            <div className="card-content">
              <div>
                <h2>{instrumentCount ? instrumentCount : 0}</h2>
              </div>
              <span className="icon">
                {" "}
                <img
                  src="/dashbord_icons/coding.png"
                  alt="icon
                    
                    "
                  style={{
                    display: "block",
                    filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "60px",
                    padding: "2px",
                  }}
                />
              </span>
            </div>
            <div className="card-footer">
              <p>Instrument</p>
            </div>
          </div>
          {/* audit log card (nombre d actions) */}
          <div className="component-card blue">
            <div className="card-content">
              <div>
                <h2>{auditLogCount ? auditLogCount : 0}</h2>
              </div>
              <span className="icon">
                {" "}
                <img
                  src="/dashbord_icons/documentation.png"
                  alt="icon
                    
                    "
                  style={{
                    display: "block",
                    // filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "60px",
                    padding: "2px",
                  }}
                />
              </span>
            </div>
            <div className="card-footer">nombre total d'actions</div>
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
              <div className="ring__label">Utilisé</div>
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
              marginRight: "15px",
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
          />
        </div>
      </div>
    </div>
  );
}
