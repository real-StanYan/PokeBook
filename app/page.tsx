"use client";
import { useState, useEffect, useCallback } from "react";
import { BiSolidArrowToBottom } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";

import PokemonCard from "@/components/PokemonCard";

import "@/css/cardContainer.css";

const Page = () => {
  const [pokeApi, setPokeApi] = useState<string>(
    `https://pokeapi.co/api/v2/pokemon/`
  );
  const [previous, setPrevious] = useState<string | undefined>();
  const [next, setNext] = useState<string | undefined>();
  const [count, setCount] = useState<number>(0);
  const [initPokemon, setInitPokemon] = useState<InitPokemon[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [pokemonCardData, setPokemonCardData] = useState<
    pokemonCardData[] | undefined
  >([]);

  const fetchAllPokemon = useCallback(async () => {
    const all_pokes_res = await fetch(pokeApi);
    const all_pokes_data = await all_pokes_res.json();
    setInitPokemon(all_pokes_data.results);
    setPrevious(all_pokes_data.previous);
    setNext(all_pokes_data.next);
    setCount(all_pokes_data.count);
  }, [pokeApi]);

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
  }, [fetchAllPokemon]);

  useEffect(() => {
    initPokemon.forEach((poke) => {
      fetchPokemon(poke.url);
    });
  }, [initPokemon]);

  console.log(pokemonCardData);

  return (
    <div className="card_main_container">
      <div className="card_container">
        {!pokemonCardData ? (
          <Skeleton count={20} />
        ) : (
          [...pokemonCardData]
            .sort((a, b) => a.id - b.id)
            .map((pokemon) => {
              return <PokemonCard key={pokemon.id} {...pokemon} />;
            })
        )}
      </div>

      <div className="page_ctrl_btns">
        <div
          style={{ display: showAll ? "none" : "flex" }}
          onClick={() => {
            setPokeApi(
              `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${count}`
            );
            setShowAll(true);
          }}
        >
          Show all
        </div>
        <div
          style={{ display: showAll ? "none" : "flex" }}
          onClick={() => {
            setPokeApi(next ? next : pokeApi);
          }}
        >
          More
        </div>
      </div>

      <div
        className="toBottom_btn"
        style={{ display: showAll ? "flex" : "none" }}
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <BiSolidArrowToBottom />
      </div>
    </div>
  );
};

export default Page;
