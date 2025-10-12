import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DashboardPageContent } from "./components/DashboardPageContent";
// import LoginBootstrap from "./components/LoginBootsrap";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Dashboard from "./components/Dashboard";
import Sidebare from "./components/Sidebare";
App.
// import { SystemsProvider } from "./Contexts/SystemsContext";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  // console.log(window.screen.availHeight);
  // console.log(window.screen.availWidth);

  return (
    <div className="App">
      {/* <SystemsProvider> */}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
              />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Dashboard
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
      {/* </SystemsProvider> */}
    </div>
  );
}

export default App;
