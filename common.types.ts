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
