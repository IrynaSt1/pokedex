import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import Card from "./Card";
import PokemonInfo from "./PokemonInfo";
import Filter from "./Filter";
import { Button, CircularProgress } from "@mui/material";
import classes from "./PokemonList.module.css";

const url = "https://pokeapi.co/api/v2/pokemon/";
const limit = 12;

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [singlePokemon, setSinglePokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderAfterCalled = useRef(false);

  const fetchFirst = useCallback(async () => {
    try {
        setLoading(true)
      const response = await axios.get(`${url}?limit=${limit}`);
      const data = response.data;
      const responseData = data.results;
      getPokemon(responseData);
    } catch (error) {
      setError(error.message);
      
    }
    setLoading(false)
  }, []);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}?offset=${offset}&limit=${limit}`
      );
      const data = response.data;
      const responseData = data.results;
      getPokemon(responseData);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [offset]);

  const getPokemon = async (res) => {
    const newPokemonList = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );
    newPokemonList.sort((a, b) => (a.id > b.id ? 1 : -1));
    setPokemonList((prevState) => [...prevState, ...newPokemonList]);
  };

  useEffect(() => {
    if (pokemonList.length === 0) {
      if (!renderAfterCalled.current) {
        fetchFirst();
      }
      renderAfterCalled.current = true;
    } else {
      fetchPokemons();
    }
  }, [fetchPokemons, fetchFirst]);

  const fetchPokemonsByType = async (type) => {
    if (type) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      const filteredPokemons = response.data.pokemon;
      setPokemonList([]);
      filteredPokemons.map(async (item) => {
        const result = await axios.get(item.pokemon.url);
        pokemonList.sort((a, b) => (a.id > b.id ? 1 : -1));
        setPokemonList((prevState) => [...prevState, result.data]);
      });
    }
  };

  const showPokemonInfo = (pokemonId) => {
    const selected = pokemonList.find((pokemon) => pokemon.id === pokemonId);
    setSinglePokemon(selected);
  };

  const handleCloseInfoDialog = () => {
    setSinglePokemon(null);
  };

  return (
    <>
      <h1 className={classes.logo}>Pokedex</h1>
      <Filter onFetchPokemons={fetchPokemonsByType} />
      <div className={classes.box}>
        <div className={classes.right_box}>
          <ul className={classes.list}>
            {pokemonList?.map((pokemon) => (
              <Card
                id={pokemon.id}
                pokemonData={pokemon}
                name={pokemon.name}
                image={
                  pokemon.sprites.other["dream_world"].front_default ??
                  pokemon.sprites.other["official-artwork"].front_default
                }
                types={pokemon.types}
                loadInfo={showPokemonInfo}
                loading={loading}
              />
            ))}
          </ul>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setOffset((prevOffset) => prevOffset + limit);
              }}
            >
              Load More
            </Button>
          )}
        </div>

        {singlePokemon && (
          <div className={classes.info_box}>
            <PokemonInfo data={singlePokemon} onClose={handleCloseInfoDialog} />
          </div>
        )}
      </div>
    </>
  );
};

export default PokemonList;
