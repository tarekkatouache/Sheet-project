import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({
  isExpanded,
  setIsExpanded,
  isLoggedIn,
  setIsLoggedIn,
  user,
}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };
  const profileSrc = user?.image
    ? `http://localhost:5000${user.image}`
    : "/profile-img/user_default_01.png";

  return (
    <div
      className={
        !isExpanded ? "collapsed nav-container" : "expended nav-container"
      }
    >
      <div className="navbar-content">
        {isLoggedIn && (
          <div className="profile-info">
            <span className="profile-name">
              {user?.name} {user?.lastName}
            </span>
            <img
              src={profileSrc}
              alt="Profile"
              className={`profile-image ${
                user?.role === "admin" ? "admin-border" : "user-border"
              }`}
            />
            <button onClick={handleLogout} className="logout-button">
              <img
                className="logout-Icon"
                src={`/${"icons2/exit.png"}`}
                alt=""
              />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
