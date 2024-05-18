import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "./WelcomePage.css";

const WelcomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`welcome-container ${darkMode ? "dark-mode" : ""}`}>
      <div>
        <Logo />
      </div>
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to PokéSwipe!</h1>
        <ul>
          <li>Pokémon Appear One at a Time</li>
          <li>Choose "Like" or "Dislike"</li>
          <li>Build Your Favourite Team</li>
        </ul>
        <Link to="/pokemon-details">
          <button className="lets-go-button">Let's Go</button>
        </Link>
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
};

export default WelcomePage;
