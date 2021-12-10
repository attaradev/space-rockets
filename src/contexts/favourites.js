import { createContext } from "react";

const FavouritesContext = createContext({
  launches: [],
  launchPads: [],
});

export default FavouritesContext;
