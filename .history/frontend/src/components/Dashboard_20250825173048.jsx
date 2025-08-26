import Sidebare from "./Sidebare";
import Navbar from "./Navbar";
import "./Dashboard.css";
import SystemContent from "./SystemeContent";
import InstrumentContent from "./InstrumentContent";
import { jwtDecode } from "jwt-decode";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SystemsPage from "../pages/SystemsPage";
import TechnicalSheetListing from "./TechnicalSheetListing";
import TechnicalPage from "./TechnicalPage";
// import { SystemsProvider } from "../Contexts/SystemsContext";
import DashboardPageContent from "./DashboardPageContent";

export default function Dashboard({
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Fetch user from localStorage in case of refresh
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  return (
    // <SystemsProvider>
    <div className="Page">
      <div className="Top-Navbar">
        <div className="Navbar">
          <Navbar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
          />
        </div>
        <div className="sideAndContent" style={{ flex: 1, display: "flex" }}>
          <div className="Sidebar">
            <Sidebare isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </div>
          <div
            className={
              !isExpanded ? "collapsed-cont Content" : "expended-cont Content"
            }
            style={{ flexGrow: 1, padding: "20px" }}
          >
            <Routes>
              <Route path="/instuments" element={<InstrumentContent />} />
              <Route path="/systems" element={<SystemContent />} />
              <Route path="/Sheets/:id" element={<TechnicalSheetListing />} />
              <Route path="/TechnicalPage" element={<TechnicalPage />} />
              <Route path="/dashboardPage" element={<DashboardPageContent />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
    // </SystemsProvider>
  );
}
