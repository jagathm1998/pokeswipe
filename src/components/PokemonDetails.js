import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./PokemonDetails.css";

const PokemonDetails = ({ pokemonId, onLike }) => {
  const [pokemon, setPokemon] = useState(null);
  const [likedPokemons, setLikedPokemons] = useState([]);
  const [decisionMade, setDecisionMade] = useState(false);
  const [currentPokemonId, setCurrentPokemonId] = useState(pokemonId);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${currentPokemonId}`
        );
        console.log(response.data);
        setPokemon(response.data);
        // setDecisionMade(false); // Reset decision flag when new Pokemon is fetched
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, [currentPokemonId]);

  const handleLike = () => {
    if (pokemon && !likedPokemons.includes(pokemon)) {
      // Call the onLike prop to update likedPokemons state in App.js
      onLike(pokemon);
    }
    setDecisionMade(true);
    getNextPokemon();
  };

  const handleDislike = () => {
    setDecisionMade(true);
    getNextPokemon();
  };

  const getNextPokemon = () => {
    if (!decisionMade) {
      console.log("A decision must be made before moving to the next Pokemon.");
      return;
    }
    // Move to the next Pokemon by incrementing the Pokemon ID
    setCurrentPokemonId((prevId) => prevId + 1);
    setDecisionMade(false);
  };

  useEffect(() => {
    if (decisionMade) {
      getNextPokemon();
    }
  }, [decisionMade]);

  const capitalize = (str) => {
    return str.toUpperCase();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`pokemon-container ${darkMode ? "dark-mode" : ""}`}>
      <div>
        <Logo />
      </div>

      <Link to="/liked-pokemons">
        <button
          className="liked-button"
          onClick={handleLike}
          disabled={decisionMade}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </Link>

      <div className="pokemon-card">
        {pokemon && (
          <>
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <div className="details-container">
              <h2>{capitalize(pokemon.name)}</h2>
              <div className="details-row">
                <div className="pill-container">
                  {pokemon.types.map((type, index) => (
                    <span key={index} className="pill">
                      {capitalize(type.type.name)}
                    </span>
                  ))}
                </div>
                <div className="abilities-container">
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index} className="pill">
                      {capitalize(ability.ability.name)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                className="dislike-button"
                onClick={handleDislike}
                disabled={decisionMade}
              >
                Dislike
              </button>
              <button
                className="like-button"
                onClick={handleLike}
                disabled={decisionMade}
              >
                Like
              </button>
            </div>
          </>
        )}
      </div>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i className={`fas ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
      </button>
    </div>
  );
};

export default PokemonDetails;
