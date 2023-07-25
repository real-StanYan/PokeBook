type InitPokemon = {
  name: string;
  url: string;
};

type pokemonCardData = {
  id: number;
  name: string;
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
  image: {
    front_default: string;
    back_default: string;
  };
};

type typeColor = {
  bgc: string;
  btc: string;
  bbc: string;
};

type pokemonData = {
  id: number;
  name: string;
  weight: number;
  evolution_chain: string;
  abilities: [];

  types: [
    {
      type: {
        name: string;
      };
    },
  ];
  image: {
    default: {
      front: string;
      back: string;
    };
    shiny: {
      front: string;
      back: string;
    };
  };
};

type pokemonEvolution = {
  id: number;
  name: string;
  evolution_level: number | null;
  image: string;
};
