"use client";
import { useState, useEffect } from "react";

import PokemonCard from "@/components/PokemonCard";

import "@/css/cardContainer.css";

const page = () => {
  const [pokeApi, setPokeApi] = useState<string>(
    `https://pokeapi.co/api/v2/pokemon/`
  );
  const [previous, setPrevious] = useState<string | undefined>();
  const [next, setNext] = useState<string | undefined>();
  const [count, setCount] = useState<number>(0);
  const [initPokemon, setInitPokemon] = useState<InitPokemon[]>([]);
  const [pokemonCardData, setPokemonCardData] = useState<
    pokemonCardData[] | undefined
  >([]);

  const fetchAllPokemon = async () => {
    const all_pokes_res = await fetch(pokeApi);
    const all_pokes_data = await all_pokes_res.json();
    setInitPokemon(all_pokes_data.results);
    setPrevious(all_pokes_data.previous);
    setNext(all_pokes_data.next);
    setCount(all_pokes_data.count);
  };

  const fetchPokemon = async (url: string) => {
    const poke_res = await fetch(url);
    const poke_data = await poke_res.json();
    const pokemonCardData = {
      id: poke_data.id,
      name: poke_data.name,
      types: poke_data.types,
      image: poke_data.sprites,
    };
    setPokemonCardData((currentList = []) => [...currentList, pokemonCardData]);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, [pokeApi]);

  useEffect(() => {
    initPokemon.forEach((poke) => {
      fetchPokemon(poke.url);
    });
  }, [initPokemon]);

  console.log(pokemonCardData);

  return (
    <div className="card_main_container">
      <div className="card_container">
        {pokemonCardData &&
          [...pokemonCardData]
            .sort((a, b) => a.id - b.id)
            .map((pokemon) => {
              return <PokemonCard key={pokemon.id} {...pokemon} />;
            })}
      </div>

      <div className="page_ctrl_btns">
        <div
          onClick={() => {
            setPokeApi(
              `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`
            );
          }}
        >
          Show all
        </div>
        <div
          onClick={() => {
            setPokeApi(next ? next : pokeApi);
          }}
        >
          More
        </div>
      </div>
    </div>
  );
};

export default page;
