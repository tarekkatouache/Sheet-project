import React from "react";
import "./DashboardPageContent.css";
import { getUploadFolderSize } from "../services/storege";

// get the upload folder size
const fetchUploadFolderSize = async () => {
  const data = await getUploadFolderSize();
  console.log("Upload folder size data:", data);
};
console.log("Fetching upload folder size...");
fetchUploadFolderSize();

export default function DashboardPageContent() {
  return (
    <div className="DashboardPageContent">
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
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-md">
        <h2 className="text-lg font-semibold mb-2">📂 Upload Folder Usage</h2>
        <p className="text-gray-600">
          <strong>Size:</strong>
          {/* {usage.sizeFormatted}   */}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {/* ({usage.sizeInBytes.toLocaleString()} bytes) */}
        </p>
      </div>
    </div>
  );
}
