import {React, useEffect, useState} from 'react';
import './App.css';
import PokeCard from './pokedex.jsx';

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

const App = () => {

  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchPokemon = async () => {
  const result = await fetch(
    `${API_URL}/${searchTerm.toLowerCase()}`
  );

  const details = await result.json();

  setPokemon([
    {
      id: details.id,
      name: details.name,
      type: details.types[0].type.name,
      front_default:
        details.sprites.other["official-artwork"].front_default,
      height: details.height / 10,
      weight: details.weight / 10,
      hp: details.stats[0].base_stat,
      attack: details.stats[1].base_stat,
      defense: details.stats[2].base_stat,
      speed: details.stats[5].base_stat,
    }
  ]);
};

  const fetchPokemon = async () => {
  const result = await fetch(`${API_URL}?limit=1025`);
  const data = await result.json();

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const details = await response.json();

      return {
        id: details.id,
        name: details.name,
        type: details.types[0].type.name,
        front_default: details.sprites.other["official-artwork"].front_default,
        height: details.height / 10,
        weight: details.weight / 10,
        hp: details.stats[0].base_stat,
        attack: details.stats[1].base_stat,
        defense: details.stats[2].base_stat,
        speed: details.stats[5].base_stat,
      };
    })
  );

  setPokemon(pokemonDetails);
}
  
  useEffect(() => {
    fetchPokemon();
  }, []);


  return(
    <div className="app">
      <a href="https://v0-pokedb.vercel.app/">
      <h1>PokéDB</h1>
      </a>

      <div className="search">
  <input
  placeholder="Search for any pokemon.."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      searchPokemon();
    }
  }}
/>
  
  <div
    className="pokeball"
    onClick={searchPokemon}
  >
    <div className="pokeball-center"></div>
  </div>
</div> 

<div className="container">
  {pokemon.map((pokemon) => (
    <PokeCard key={pokemon.id} pokemon={pokemon} />
  ))}
</div>
<footer className="footer">
  Made by <a className="author" href="https://github.com/ShivuXD">Shivam</a>
</footer>

      </div>
      
  );
}

export default App;
