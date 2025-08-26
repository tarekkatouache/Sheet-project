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
      <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <HardDrive className="w-8 h-8 text-blue-600" />
            <h2 className="text-lg font-semibold">Upload Storage Usage</h2>
          </div>

          <div className="text-sm text-gray-500 mb-2">
            Used:{" "}
            <span className="font-medium text-gray-800">{sizeFormatted}</span>
          </div>

          <Progress value={usagePercent} className="h-3 rounded-full" />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>0 MB</span>
            <span>1 GB</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
