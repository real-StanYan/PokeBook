"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import typeColor from "@/util/typeColor";
import { BsArrowRight } from "react-icons/bs";

import "@/css/pokemonDetail.css";

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const [pokemon, setPokemon] = useState<pokemonData | undefined>();
  const [DefaultShiny, setDefaultShiny] = useState<string>("default");
  const [FrontBack, setFrontBack] = useState<string>("front");
  const [pokemonEvolution, setEvolutionChain] = useState<pokemonEvolution[]>(
    []
  );
  const [pokemonImg, setPokemonImg] = useState<string>(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      const evolution_res = await fetch(data.species.url);
      const evolution_data = await evolution_res.json();

      const pokemonData: pokemonData = {
        id: data.id,
        name: data.name,
        weight: data.weight,
        abilities: data.abilities,
        evolution_chain: evolution_data.evolution_chain.url,
        types: data.types,
        image: {
          default: {
            front: data.sprites.front_default,
            back: data.sprites.back_default,
          },
          shiny: {
            front: data.sprites.front_shiny,
            back: data.sprites.back_shiny,
          },
        },
      };

      setPokemon(pokemonData);
    };
    fetchPokemon();
  }, []);

  console.log(pokemon);

  useEffect(() => {
    const initEvolutionChain = async () => {
      const res = await fetch(pokemon?.evolution_chain as string);
      const data = await res.json();
      let evolutionChain = data.chain;
      const evolutionChain_res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evolutionChain.species.name}`
      );
      const evolutionChain_data = await evolutionChain_res.json();
      console.log("data", evolutionChain_data);

      let evolutionChainData: pokemonEvolution = {
        id: evolutionChain_data.id,
        name: evolutionChain_data.name,
        evolution_level:
          evolutionChain?.evolves_to[0]?.evolution_details[0]?.min_level,
        image: evolutionChain_data.sprites.front_default,
      };

      setEvolutionChain((currentList = []) => [
        ...currentList,
        evolutionChainData,
      ]);
      const checkEvolution = async () => {
        if (evolutionChain.evolves_to.length === 0) {
          evolutionChain = data.chain;
          return;
        } else {
          evolutionChain = evolutionChain.evolves_to[0];
          const evolutionChain_res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${evolutionChain.species.name}`
          );
          const evolutionChain_data = await evolutionChain_res.json();
          console.log("data", evolutionChain_data);

          let evolutionChainData: pokemonEvolution = {
            id: evolutionChain_data.id,
            name: evolutionChain_data.name,
            evolution_level:
              evolutionChain?.evolves_to[0]?.evolution_details[0]?.min_level,
            image: evolutionChain_data.sprites.front_default,
          };
          setEvolutionChain((currentList = []) => [
            ...currentList,
            evolutionChainData,
          ]);
          checkEvolution();
          return;
        }
      };
      checkEvolution();
      console.log(evolutionChain);
    };
    initEvolutionChain();
  }, [pokemon]);

  return (
    <div className="pokemonDetail_main_container">
      <div className="basic_infor_container">
        <div className="basic_infor">
          {/* Pokemon Images */}
          <div className="pokemon_images">
            <div className="default_shiny_switch">
              <div
                className={`default_switch ${
                  DefaultShiny === "default" ? "active" : ""
                }`}
                onClick={() => {
                  setDefaultShiny("default");
                  const imgKey = FrontBack === "front" ? "front" : "back";
                  setPokemonImg(pokemon?.image.default[imgKey] as string);
                }}
              >
                Default
              </div>
              <div
                className={`shiny_switch ${
                  DefaultShiny === "shiny" ? "active" : ""
                }`}
                onClick={() => {
                  setDefaultShiny("shiny");
                  const imgKey = FrontBack === "front" ? "front" : "back";
                  setPokemonImg(pokemon?.image.shiny[imgKey] as string);
                }}
              >
                Shiny
              </div>
            </div>
            <img src={pokemonImg} className="pokemon_image" alt="rd" />
            <div className="front_back_switch">
              <div
                className={`front_switch ${
                  FrontBack === "front" ? "active" : ""
                }`}
                onClick={() => {
                  setFrontBack("front");
                  const imgKey =
                    DefaultShiny === "default" ? "default" : "shiny";
                  setPokemonImg(pokemon?.image[imgKey].front as string);
                }}
              >
                Front
              </div>
              <div
                className={`back_switch ${
                  FrontBack === "back" ? "active" : ""
                }`}
                onClick={() => {
                  setFrontBack("back");
                  const imgKey =
                    DefaultShiny === "default" ? "default" : "shiny";
                  setPokemonImg(pokemon?.image[imgKey].back as string);
                }}
              >
                Back
              </div>
            </div>
          </div>
          {/* Pokemon Information */}
          <div className="pokemon_infor">
            <div className="pokemon_infor_id">
              <span className="infor_title">ID:</span>{" "}
              <span className="infor_content">{pokemon?.id}</span>
            </div>
            <div className="pokemon_infor_name">
              <span className="infor_title">NAME:</span>
              <span className="infor_content">{pokemon?.name}</span>
            </div>
            <div className="pokemon_infor_types">
              <span className="infor_title">TYPES:</span>
              <span className="infor_content">
                {pokemon?.types.map((type, i) => {
                  const color: typeColor | undefined = typeColor(
                    type.type.name
                  );
                  return (
                    <span
                      key={i}
                      className="pokemon_infor_type"
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
              </span>
            </div>
            <div className="pokemon_infor_weight">
              <span className="infor_title">WEIGHT:</span>
              <span className="infor_content">{pokemon?.weight}</span>
            </div>
          </div>
        </div>
        <div className="evolution_chain">
          {pokemonEvolution.length > 0 &&
            pokemonEvolution.map((pokemon, i) => {
              return (
                <div className="evolution_chain_pokemon" key={i}>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="evolution_chain_pokemon_image"
                    onClick={() => {
                      router.push(`/pokemon/${pokemon.id}`);
                    }}
                  />
                  <p className="evolution_chain_pokemon_name">{pokemon.name}</p>
                  {i < pokemonEvolution.length - 1 && (
                    <div className="evolution_arrow">
                      <BsArrowRight />
                      <p>LV. {pokemon.evolution_level}</p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
