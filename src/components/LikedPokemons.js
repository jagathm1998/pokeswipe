import React, { useState } from "react";
import Logo from "./Logo";
import "./LikedPokemons.css";

const LikedPokemons = ({ likedPokemons }) => {
  console.log(likedPokemons);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const capitalize = (str) => {
    return str.toUpperCase();
  };

  return (
    <div className={`liked-pokemons-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="logo-container">
        <Logo />
      </div>

      <div className="liked-pokemons">
        {likedPokemons.map((pokemon) => (
          <div className="pokemon-liked-card" key={pokemon.id}>
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
              className="pokemon-liked-image"
            />
            <h4 className="liked-pokemon-name">{capitalize(pokemon.name)}</h4>
          </div>
        ))}
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
};

export default LikedPokemons;
