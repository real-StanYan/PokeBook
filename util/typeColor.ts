const typeColor = (type: string) => {
  switch (type) {
    case "normal":
      return { bgc: "#A8A878", btc: "#D8D8D0", bbc: "#705848" };
    case "fire":
      return { bgc: "#F08030", btc: "#F8D030", bbc: "#C03028" };
    case "water":
      return { bgc: "#6890F0", btc: "#98D8D8", bbc: "#807870" };
    case "grass":
      return { bgc: "#78C850", btc: "#C0F860", bbc: "#588040" };
    case "electric":
      return { bgc: "#F8D030", btc: "#F8F878", bbc: "#B8A038" };
    case "ice":
      return { bgc: "#98D8D8", btc: "#D0F8E8", bbc: "#9090A0" };
    case "fighting":
      return { bgc: "#C03028", btc: "#F08030", bbc: "#484038" };
    case "poison":
      return { bgc: "#A040A0", btc: "#D880B8", bbc: "#483850" };
    case "ground":
      return { bgc: "#E0C068", btc: "#F8F878", bbc: "#886830" };
    case "flying":
      return { bgc: "#A890F0", btc: "#C8C0F8", bbc: "#705898" };
    case "psychic":
      return { bgc: "#F85888", btc: "#F8C0B0", bbc: "#789010" };
    case "bug":
      return { bgc: "#A8B820", btc: "#D8E030", bbc: "#A8B820" };
    case "rock":
      return { bgc: "#B8A038", btc: "#E0C068", bbc: "#886830" };
    case "ghost":
      return { bgc: "#705898", btc: "#A890F0", bbc: "#483850" };
    case "dark":
      return { bgc: "#705848", btc: "#A8A878", bbc: "#484038" };
    case "dragon":
      return { bgc: "#7038F8", btc: "#B8A0F8", bbc: "#483890" };
    case "steel":
      return { bgc: "#B8B8D0", btc: "#D8D8C0", bbc: "#807870" };
    case "fairy":
      return { bgc: "#F0B6BC", btc: "#F5CAD1", bbc: "#905F63" };
  }
};

export default typeColor;
