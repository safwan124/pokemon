import Card from "./card";
import Description from "./description";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { useEffect, useState } from "react";
// import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const App = () => {
  const [pokeis, setPokies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState();
  const [previous, setPrevious] = useState();
  const [pokeDes, SetPokeDes] = useState();

  const reqPokies = async () => {
    setLoading(true);
    try {
      const responce = await fetch(API_URL);
      const data = await responce.json();
      setNext(data.next);
      setPrevious(data.previous);
      await getPokemon(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  const getPokemon = async (data) => {
    const firstfiveUrls = data.slice(0, 6).map((item) => item.url);
    const pokeData = await Promise.all(
      firstfiveUrls.map(async (url) => {
        const response = await fetch(url);
        const pokemonData = await response.json();
        return pokemonData;
      })
    );
    setPokies(pokeData);
  };
  const fetchNextPokies = async () => {
    setLoading(true);
    try {
      const response = await fetch(next);
      const data = await response.json();
      setNext(data.next);
      setPrevious(data.previous);
      await getPokemon(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };
  
  const fetchPreviousPokies = async () => {
    setLoading(true);
    try {
      const response = await fetch(previous); // Use the 'previous' URL to fetch the previous set of Pokémon data
      const data = await response.json();
      setNext(data.next);
      setPrevious(data.previous);
      await getPokemon(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    reqPokies();
  }, []);
  useEffect(() => {
    // This will show the updated value whenever pokeis changes
  }, [pokeis]);
  return (
    <>
      <div className="App">
        <img src="/pokelogo.png" className="pokelogo" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 left-content">
            <Card
              pokemon={pokeis}
              loading={loading}
              pokeInfo={(poke) => SetPokeDes(poke)}
            />
            <div className="buttons mb-5">
              <button
                className="btn btn-warning mx-3"
                onClick={() => {
    fetchPreviousPokies();
                }}
              >
                Previous
              </button>

              <button
                className="btn btn-warning"
                onClick={() => {
                  fetchNextPokies();
                }}
              >
                Next
              </button>
            </div>
          </div>
          <div className="col-sm-6 right-content">
            <Description des={pokeDes} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
