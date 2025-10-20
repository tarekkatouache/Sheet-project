import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login({ setUser, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoggedIn(true);
      setUser(user);

      alert("Connexion réussie !");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Échec de la connexion. Veuillez réessayer.");
      setError(err.response?.data?.message || "La connexion a échoué");
    }
  };

  return (
    // <div className="wrapper signIn">
    //   <div className="form">
    //     <div className="heading">Se connecter</div>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="username">Nom d'utilisateur</label>
    //         <input
    //           type="text"
    //           id="username"
    //           placeholder="Enter your username"
    //           value={formData.username}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Mot de passe</label>
    //         <input
    //           type="password"
    //           id="password"
    //           placeholder="Enter your password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required
    //         />
    //       </div>
    //       <button className="Connect-button" type="submit">
    //         Connecter
    //       </button>
    //     </form>
    //     {error && <p className="error-msg">{error}</p>}
    //     <p>
    //       Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
    //     </p>
    //   </div>
    // </div>
      <video
        id="background-video"
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/background_IMGs/Hailuo_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div className="wrapper signIn">
      <div
        className="form"
        style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}
      >
        <div className="heading">Se connecte</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Mon mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="Connect-button" type="submit">
            Connect
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <p>
          Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}
