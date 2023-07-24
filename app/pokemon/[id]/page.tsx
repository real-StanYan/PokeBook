"use client";

import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [pokemon, setPokemon] = useState<pokemonCardData>();

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      console.log(data);
    };
    fetchPokemon();
  });

  return <div>{id}</div>;
};

export default page;
