"use client";

import { FC, useState } from "react";

import "@/css/PokemonCard.css";

const PokemonCard: FC<pokemonCardData> = ({ ...pokemon }) => {
  const [img, setImg] = useState<string>(pokemon.image.front_default);

  const handlemouseEnter = () => {
    setImg(pokemon.image.back_default);
  };

  const handlemouseLeave = () => {
    setImg(pokemon.image.front_default);
  };

  return (
    <div className="pokemonCard">
      <img
        src={img}
        alt={`${pokemon.id}_${pokemon.name}`}
        className="pokemonCard_image"
        onMouseEnter={handlemouseEnter}
        onMouseLeave={handlemouseLeave}
      />
      <p className="pokemonCard_id">{pokemon.id}</p>
      <p className="pokemonCard_name">{pokemon.name}</p>
      <div className="pokemonCard_types">
        {pokemon.types.map((type, i) => {
          return (
            <span className="pokemonCard_type" key={i}>
              {type.type.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
