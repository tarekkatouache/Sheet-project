import "./Sidebare.css";
import { Link } from "react-router-dom";
// import { tex t } from "body-parser";
// import System2 from "/icons2/systems2.png";

function Sidebare({ isExpanded, setIsExpanded }) {
  const menuItems = [
    {
      rout: "",
      text: "Dashboard",
      icon: "icons2/dashboard.png",
    },
    {
      rout: "systems",
      text: "Systemes",
      icon: "icons2/systems2.svg",
    },
    {
      rout: "instuments",
      text: "instruments",
      icon: "icons2/sheet.png",
    },
    {
      rout: "TechnicalPage",
      text: "Fiches Techniques",
      icon: "icons2/sheet2.png",
    },
    {
      rout: "dashboard/Search",
      text: "Search",
      icon: "icons/search.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre C",
      icon: "icons2/statistic2.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre D",
      icon: "icons2/innovation.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre E",
      icon: "icons2/proton.svg",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre F",
      icon: "icons2/systems.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre G",
      icon: "icons2/technical-writing.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre H",
      icon: "icons2/users.png",
    },
    {
      rout: "dashboard/systemeContent",
      text: "Titre I",
      icon: "icons2/users2.png",
    },
    // { text: "Profile", icon: "icons/search.svg" },
    // { text: "Profile", icon: "icons/logout.svg" },
    // { text: "Profile", icon: "icons/folder.svg" },
    // { text: "Profile", icon: "icons/message.svg" },
    // { text: "Profile", icon: "icons/shopping-cart.svg" },
    // { text: "Profile", icon: "icons/user.svg" },
    // { text: "Profile", icon: "icons/settings.svg" },
    // { text: "Profile", icon: "icons/pie-chart.svg" },
  ];
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX "
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          <div className="nav-brand">
            <img
              className={`showkart-heading ${
                isExpanded ? "expanded" : "collapsed"
              }`}
              src={`/${"icons/CRNB.gif"}`}
              alt=""
            />
            <h2
              className={`showkart-heading ${
                isExpanded ? "expanded" : "collapsed"
              }`}
            >
              FicheTechnique
            </h2>{" "}
          </div>
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* <div className="nav-menu">
            {menuItems.map(({ text, icon }) => (
              <a
                href="www.google.com"
                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              >
                <img
                  src={icon}
                  alt=""
                  style={{
                    filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "55px",
                  }}
                />
                {isExpanded && <p>{text}</p>}
                {!isExpanded && <div className="tooltips">{text}</div>}
              </a>
            ))}
          </div> */}
          <div className="nav-menu">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.rout ? `/dashboard/${item.rout}` : "/dashboard"}
                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              >
                <img
                  src={`/${item.icon}`}
                  alt="icon"
                  style={{
                    filter: "invert(1) brightness(1.5) contrast(1.2)",
                    width: "55px",
                  }}
                />
                {isExpanded && <p>{item.text}</p>}
                {!isExpanded && <div className="tooltips">{item.text}</div>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebare;
