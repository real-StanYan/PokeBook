"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import typeColor from "@/util/typeColor";

import "@/css/pokemonCard.css";

const PokemonCard: FC<pokemonCardData> = ({ ...pokemon }) => {
  const router = useRouter();
  const [img, setImg] = useState<string>(pokemon.image.front_default);

  const handlemouseEnter = () => {
    setImg(pokemon.image.back_default);
  };

  const handlemouseLeave = () => {
    setImg(pokemon.image.front_default);
  };

  return (
    <div
      className="pokemonCard"
      onClick={() => {
        router.push(`/pokemon/${pokemon.id}`);
      }}
    >
      <img
        src={img}
        alt={`${pokemon.id}_${pokemon.name}`}
        className="pokemonCard_image"
        onMouseEnter={handlemouseEnter}
        onMouseLeave={handlemouseLeave}
      />
      <div className="card_content">
        <p className="pokemonCard_id">{pokemon.id}</p>
        <p className="pokemonCard_name">{pokemon.name}</p>
        <div className="pokemonCard_types">
          {pokemon.types.map((type, i) => {
            const color: typeColor | undefined = typeColor(type.type.name);
            return (
              <span
                className="pokemonCard_type"
                key={i}
                style={{
                  backgroundColor: `${color?.bgc}`,
                  borderTop: `2px solid ${color?.btc}`,
                  borderBottom: `2px solid ${color?.bbc}`,
                }}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
