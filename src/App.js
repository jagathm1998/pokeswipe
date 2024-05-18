import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import PokemonDetails from "./components/PokemonDetails";
import LikedPokemons from "./components/LikedPokemons";
import "./App.css";

function App() {
  const [likedPokemons, setLikedPokemons] = useState([]);

  const handleLikePokemon = (pokemon) => {
    // Check if the liked Pokemon is already in the likedPokemons array
    if (!likedPokemons.some((p) => p.id === pokemon.id)) {
      // If not, add the liked Pokemon to the array
      setLikedPokemons([...likedPokemons, pokemon]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/pokemon-details"
            element={
              <PokemonDetails pokemonId={1} onLike={handleLikePokemon} />
            }
          />
          <Route
            path="/liked-pokemons"
            element={<LikedPokemons likedPokemons={likedPokemons} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
