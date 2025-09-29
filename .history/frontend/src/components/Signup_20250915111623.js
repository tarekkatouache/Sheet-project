import React from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    jobTitle: "",
    service: "",
    username: "",
    password: "",
    email: "",
    role: "user",
    profileImage: "",
  });
  const handleFileChange = (e) => {
    console.log("File input event:", e.target.files);
    if (e.target.files.length > 0) {
      console.log("Selected file:", e.target.files[0]);
      setProfileImage(e.target.files[0]);
    }
  };

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
      const data = new FormData();
      data.append("name", formData.name);
      data.append("lastName", formData.lastName);
      data.append("jobTitle", formData.jobTitle);
      data.append("service", formData.service);
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("email", formData.email);
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Connexion réussie !");

      // ✅ You can save a JWT token if your backend returns it
      const token = res.data.token;
      localStorage.setItem("token", token);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Échec de la connexion. Veuillez réessayer.");
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="wrapper signUp">
      <div
        className="form"
        style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.3)" }}
      >
        <div className="heading">CRÉER UN COMPTE</div>
        <form
          onSubmit={handleSubmit}
          className="form-grid "
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="form-row" style={{}}>
            <div className="form-group">
              <label style={{ paddingRight: "63px" }} htmlFor="name">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Prénom</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group" style={{}}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{}}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{}}>
            <label htmlFor="jobTitle">Titre de poste</label>
            {/*
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              required
              value={formData.jobTitle}
              onChange={handleChange}
            /> */}
            <select
              id="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            >
              <option value="">-- Sélectionnez votre titre du poste --</option>
              <option value="ingénieure">ingénieure</option>
              <option value="ingénieur spécialisé">ingénieur spécialisé</option>
              <option value="technicien supérieur">technicien supérieur</option>
              <option value="technicien">technicien</option>
              <option value="chercheur">chercheur</option>
              <option value="aide chercheur">aid chercheur</option>
            </select>
          </div>
          <div className="form-group" style={{}}>
            <label htmlFor="service">Service</label>
            <select
              type="text"
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
            >
              <option value="">-- Sélectionnez votre service --</option>
              <option value="SMICC">SMICC</option>
              <option value="SMM">SMM</option>
              <option value="SME">SME</option>
              <option value="Utilitaire">Utilitaire</option>
              <option value="HALL">HALL</option>
              <option value="SOB">SOB</option>
              <option value="SOR">SOR</option>
            </select>
          </div>
          <div className="form-group" style={{}}>
            <label>Photo de profil:</label>
            <input
              type="file"
              accept="image/*"
              name="profileImage"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group" style={{}}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Créer</button>
        </form>

        <p>
          Avez-vous un compte ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}
////  name, lastName, jobTitle, service, username, password, email
////  name, lastName, jobTitle, service, username, password, email
////  name, lastName, jobTitle, service, username, password, email
////  name, lastName, jobTitle, service, username, password, email
////  name, lastName, jobTitle, service, username, password, email
